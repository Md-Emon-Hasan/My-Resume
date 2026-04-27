/**
 * ══════════════════════════════════════════════════════════════════
 *  ScrollAnimator  –  Vanilla JS scroll animation engine
 *  Powered by the Intersection Observer API (no scroll listeners,
 *  no jQuery, no heavy libraries, no layout thrashing).
 * ══════════════════════════════════════════════════════════════════
 *
 *  REQUIRED HTML STRUCTURE
 *  ───────────────────────
 *  Add .scroll-animate to any element you want to reveal, then
 *  pair it with ONE direction class:
 *
 *    <div class="scroll-animate animate-left">...</div>
 *    <div class="scroll-animate animate-right">...</div>
 *    <div class="scroll-animate animate-up">...</div>
 *    <div class="scroll-animate animate-fade">...</div>
 *
 *  STAGGER GROUPS
 *  ──────────────
 *  Put data-stagger="<seconds>" on a parent wrapper.
 *  Every .scroll-animate child gets an incremental transitionDelay.
 *
 *    <div data-stagger="0.1">
 *      <div class="scroll-animate animate-up">Card 1</div>
 *      <div class="scroll-animate animate-up">Card 2</div>
 *      <div class="scroll-animate animate-up">Card 3</div>
 *    </div>
 *
 *  PER-ELEMENT OPTIONS (HTML attributes)
 *  ──────────────────────────────────────
 *    data-delay="0.2"   →  extra delay added on top of stagger (seconds)
 *    data-repeat        →  re-animate every time element enters viewport
 *
 *  PUBLIC API
 *  ──────────
 *    ScrollAnimator.refresh()      →  observe any newly added .scroll-animate elements
 *    ScrollAnimator.observe(el)    →  observe a single specific element
 *
 * ══════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    /* ── 1. CONFIGURATION ───────────────────────────────────────────────────── */
    var CFG = {
        /* % of the element that must be visible before the animation fires.
           Lower values = trigger earlier (element barely visible).
           0.12 = fire when ~12% of the element is in the viewport. */
        threshold: 0.12,

        /* rootMargin shrinks the detection zone on the bottom edge.
           '-60px' means the trigger line is 60 px ABOVE the bottom of the
           viewport → elements animate just as they scroll into comfortable view,
           not right at the edge. */
        rootMargin: '0px 0px -60px 0px',

        /* CSS class toggled by JS to trigger the visible-state transition */
        activeClass: 'sa-in'
    };


    /* ── 2. STAGGER DELAY CALCULATOR ────────────────────────────────────────── */
    /**
     * Returns the computed stagger delay (seconds) for an element.
     * Walks up to find the nearest [data-stagger] ancestor. If found,
     * calculates the element's index among its stagger siblings and
     * multiplies by the stagger increment value.
     *
     * Supports two nesting patterns:
     *   A)  parent[data-stagger] > .scroll-animate          (flat list)
     *   B)  parent[data-stagger] > wrapper > .scroll-animate (col-inside-row)
     */
    function getStaggerDelay(el) {
        var group = el.closest('[data-stagger]');
        if (!group) return 0;

        var increment = parseFloat(group.dataset.stagger) || 0.08;

        /* Collect all .scroll-animate descendants that are either
           direct children OR grandchildren of the stagger group.
           This covers both flat lists and Bootstrap column wrappers. */
        var items = Array.from(
            group.querySelectorAll(
                ':scope > .scroll-animate, :scope > * > .scroll-animate'
            )
        );

        var index = items.indexOf(el);
        return index >= 0 ? index * increment : 0;
    }


    /* ── 3. ANIMATE IN / OUT ────────────────────────────────────────────────── */
    function animateIn(el) {
        /* Combine any explicit data-delay with the computed stagger offset */
        var manual   = parseFloat(el.dataset.delay  || 0);
        var stagger  = getStaggerDelay(el);
        var total    = manual + stagger;

        /* Apply delay through inline style — overridden once transition ends
           via clearDelay, so future re-animations start clean */
        el.style.transitionDelay = total > 0 ? total + 's' : '';
        el.classList.add(CFG.activeClass);
    }

    function animateOut(el) {
        /* Reset to hidden state for elements with data-repeat */
        el.style.transitionDelay = '0s';
        el.classList.remove(CFG.activeClass);
    }


    /* ── 4. INTERSECTION OBSERVER ───────────────────────────────────────────── */
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var el = entry.target;

            if (entry.isIntersecting) {
                animateIn(el);

                /* Default behaviour: animate once, then stop watching.
                   Elements with [data-repeat] keep being observed so they
                   can re-animate when they scroll back in. */
                if (!el.hasAttribute('data-repeat')) {
                    observer.unobserve(el);
                }

            } else if (el.hasAttribute('data-repeat')) {
                /* Scroll direction reversed → reset for next entry */
                animateOut(el);
            }
        });
    }, {
        threshold:  CFG.threshold,
        rootMargin: CFG.rootMargin
    });


    /* ── 5. INIT ────────────────────────────────────────────────────────────── */
    /**
     * Finds all .scroll-animate elements inside `root` (defaults to document)
     * and registers them with the observer. Safe to call multiple times —
     * already-animated elements are unobserved and won't be re-registered.
     */
    function init(root) {
        var scope = root || document;
        scope.querySelectorAll('.scroll-animate').forEach(function (el) {
            /* Skip elements that have already completed their animation
               (observer already unobserved them, so this is a no-op safety) */
            if (el.classList.contains(CFG.activeClass) && !el.hasAttribute('data-repeat')) return;
            observer.observe(el);
        });
    }

    /* Boot: wait for DOM if called before it is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
        init();
    }


    /* ── 6. PUBLIC API ──────────────────────────────────────────────────────── */
    window.ScrollAnimator = {
        /**
         * Re-scan the document (or a subtree) for new .scroll-animate elements.
         * Call this after dynamically inserting content.
         * @param {Element} [root]  Optional root element to scan inside.
         */
        refresh: function (root) { init(root); },

        /**
         * Manually register a single element with the observer.
         * @param {Element} el
         */
        observe: function (el) { observer.observe(el); }
    };

}());
