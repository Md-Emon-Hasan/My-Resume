/*
 * ScrollAnimator — animate.css + Intersection Observer
 *
 * Add .scroll-animate to any element, then ONE direction class:
 *   .animate-left   → fadeInLeft
 *   .animate-right  → fadeInRight
 *   .animate-up     → fadeInUp
 *   .animate-fade   → fadeIn
 *
 * Stagger:  data-stagger="0.08" on a parent wrapper
 * Delay:    data-delay="0.2" on the element (seconds)
 * Repeat:   data-repeat — re-animate each time it enters viewport
 *
 * API:
 *   ScrollAnimator.refresh()   — observe newly added elements
 *   ScrollAnimator.observe(el) — observe a single element
 */

(function () {
    'use strict';

    var DIRECTION_MAP = {
        'animate-left':  'fadeInLeft',
        'animate-right': 'fadeInRight',
        'animate-up':    'fadeInUp',
        'animate-fade':  'fadeIn'
    };

    var CFG = {
        threshold:  0.05,
        rootMargin: '0px 0px 60px 0px'
    };

    /* ── Stagger delay calculator ─────────────────────────────────── */
    function getStaggerDelay(el) {
        var group = el.closest('[data-stagger]');
        if (!group) return 0;

        var increment = parseFloat(group.dataset.stagger) || 0.08;
        var items = Array.from(
            group.querySelectorAll(
                ':scope > .scroll-animate, :scope > * > .scroll-animate'
            )
        );
        var index = items.indexOf(el);
        return index >= 0 ? index * increment : 0;
    }

    /* ── Get animate.css class for this element ──────────────────── */
    function getAnimationClass(el) {
        var keys = Object.keys(DIRECTION_MAP);
        for (var i = 0; i < keys.length; i++) {
            if (el.classList.contains(keys[i])) {
                return DIRECTION_MAP[keys[i]];
            }
        }
        return 'fadeIn'; /* fallback */
    }

    /* ── Animate in ───────────────────────────────────────────────── */
    function animateIn(el) {
        var manual  = parseFloat(el.dataset.delay  || 0);
        var stagger = getStaggerDelay(el);
        var total   = manual + stagger;

        if (total > 0) {
            el.style.animationDelay = total + 's';
        }

        var animClass = getAnimationClass(el);
        el.classList.add('animated', animClass);

        /* Clean up inline delay after animation ends so future
           re-animations (data-repeat) start clean */
        el.addEventListener('animationend', function onEnd() {
            el.style.animationDelay = '';
            el.removeEventListener('animationend', onEnd);
        });
    }

    /* ── Animate out (only for data-repeat elements) ─────────────── */
    function animateOut(el) {
        var animClass = getAnimationClass(el);
        el.classList.remove('animated', animClass);
        el.style.animationDelay = '';
        el.style.opacity = '0';
    }

    /* ── Intersection Observer ────────────────────────────────────── */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var el = entry.target;

            if (entry.isIntersecting) {
                animateIn(el);

                if (!el.hasAttribute('data-repeat')) {
                    observer.unobserve(el);
                }
            } else if (el.hasAttribute('data-repeat')) {
                animateOut(el);
            }
        });
    }, {
        threshold:  CFG.threshold,
        rootMargin: CFG.rootMargin
    });

    /* ── Init ─────────────────────────────────────────────────────── */
    function init(root) {
        var scope = root || document;
        scope.querySelectorAll('.scroll-animate').forEach(function (el) {
            /* Skip already-animated non-repeat elements */
            var animClass = getAnimationClass(el);
            if (el.classList.contains('animated') && el.classList.contains(animClass)
                && !el.hasAttribute('data-repeat')) return;
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
        init();
    }

    /* ── Public API ───────────────────────────────────────────────── */
    window.ScrollAnimator = {
        refresh: function (root) { init(root); },
        observe: function (el)   { observer.observe(el); }
    };

}());
