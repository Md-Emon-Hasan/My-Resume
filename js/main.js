/**
 * Portfolio Main JavaScript
 * Author: Md. Hasan Imon
 */

;(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────────────
       UTILITIES
    ───────────────────────────────────────────────────────────────── */

    var isMobile = {
        any: function () {
            return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
        }
    };

    /* ─────────────────────────────────────────────────────────────────
       LAYOUT
    ───────────────────────────────────────────────────────────────── */

    var fullHeight = function () {
        if (isMobile.any()) return;
        var setHeight = function () {
            $('.js-fullheight').css('height', window.innerHeight + 'px');
        };
        setHeight();
        $(window).on('resize orientationchange', setHeight);
    };

    /* ─────────────────────────────────────────────────────────────────
       NAVIGATION
    ───────────────────────────────────────────────────────────────── */

    var navActive = function (section) {
        var $ul = $('#navbar > ul');
        $ul.find('li').removeClass('active');
        $ul.find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    };

    var burgerMenu = function () {
        $('.js-colorlib-nav-toggle').on('click', function (e) {
            e.preventDefault();
            var isOpen = $('body').hasClass('offcanvas');
            $('body').toggleClass('offcanvas', !isOpen);
            $(this).toggleClass('active', !isOpen);
        });
    };

    var mobileMenuOutsideClick = function () {
        $(document).on('click', function (e) {
            if ($('body').hasClass('offcanvas') &&
                !$(e.target).closest('#colorlib-aside, .js-colorlib-nav-toggle').length) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
        });
    };

    var clickMenu = function () {
        $('#navbar a:not([class="external"])').on('click', function (e) {
            e.preventDefault();
            navActive($(this).data('nav-section'));
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
        });
    };

    var navigationSection = function () {
        var $section = $('section[data-section]');
        $section.waypoint(function (direction) {
            if (direction === 'down') navActive($(this.element).data('section'));
        }, { offset: '150px' });
        $section.waypoint(function (direction) {
            if (direction === 'up') navActive($(this.element).data('section'));
        }, { offset: function () { return -$(this.element).height() + 155; } });
    };

    var fixAccordion = function () {
        $(document).on('click', '.panel-heading', function (e) {
            var $a = $(this).find('a[data-toggle="collapse"]');
            if ($a.length && !$(e.target).is('a')) $a.trigger('click');
        });
    };

    /* ─────────────────────────────────────────────────────────────────
       UI COMPONENTS
    ───────────────────────────────────────────────────────────────── */

    var initPreloader = function () {
        if (!$('.ai-preloader').length || typeof gsap === 'undefined') return;
        var progress = { val: 0 };
        gsap.to(progress, {
            val:      100,
            duration: 1.8,
            ease:     'power2.inOut',
            onUpdate: function () {
                $('.preloader-percent').text(Math.round(progress.val));
                $('.preloader-bar').css('width', progress.val + '%');
            },
            onComplete: function () {
                gsap.to('.ai-preloader', {
                    yPercent: -100,
                    duration: 0.8,
                    ease:     'power3.inOut',
                    onComplete: function () { $('.ai-preloader').remove(); }
                });
            }
        });
    };

    var sliderMain = function () {
        $('#colorlib-hero .flexslider').flexslider({
            animation:      'slide',
            slideshowSpeed: 8000,
            animationSpeed: 700,
            directionNav:   false,
            controlNav:     true,
            pauseOnHover:   true,
            start: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
        });
    };

    var initThemeToggle = function () {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        var icon = btn.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'icon-sun2';
        }

        btn.addEventListener('click', function () {
            var isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
            var newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            icon.className = isDark ? 'icon-moon' : 'icon-sun2';
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', clearProps: 'transform' });
            }
            localStorage.setItem('theme', newTheme);
        });
    };

    var initProjectModals = function () {
        $('.project-item').on('click', function (e) {
            e.preventDefault();
            var $item    = $(this);
            var category = ($item.data('category') || 'Project').replace('-', ' ');

            $('#modal-title').text($item.find('h3 a').text());
            $('#modal-desc').text($item.find('.project-desc').text());
            $('#modal-link').attr('href', $item.find('.project-footer a').attr('href'));
            $('#modal-category').text(category);
            $('#modal-tags').html($item.find('.project-tags').html());
            $('#modal-image').css('background-image', $item.find('.project-thumb-inner').css('background-image'));

            $('#project-modal').css('display', 'flex');
            gsap.to('#project-modal', { opacity: 1, duration: 0.3 });
            gsap.fromTo('.modal-content-wrap',
                { scale: 0.8, opacity: 0 },
                { scale: 1,   opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
            );
        });

        $('.modal-close, .modal-backdrop').on('click', function () {
            gsap.to('.modal-content-wrap', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
            gsap.to('#project-modal', {
                opacity:    0,
                duration:   0.3,
                onComplete: function () { $('#project-modal').css('display', 'none'); }
            });
        });
    };

    var initProjectFilterFlip = function () {
        if (typeof gsap === 'undefined') return;

        var filters   = document.querySelectorAll('.work-menu a');
        var projects  = Array.from(document.querySelectorAll('.project-item'));
        var container = document.querySelector('#projects');
        if (!container || !projects.length) return;

        var isAnimating   = false;
        var currentFilter = 'all';

        function afterFilter() {
            isAnimating = false;
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            if (window.lenis) window.lenis.resize();
        }

        filters.forEach(function (filter) {
            filter.addEventListener('click', function (e) {
                e.preventDefault();
                if (isAnimating) return;

                var newFilter = this.getAttribute('data-filter');
                if (newFilter === currentFilter) return;

                filters.forEach(function (f) { f.classList.remove('active'); });
                this.classList.add('active');
                currentFilter = newFilter;
                isAnimating   = true;

                /* Split purely by filter match — no inline-style dependency */
                var toHide = projects.filter(function (p) {
                    return newFilter !== 'all' && p.getAttribute('data-category') !== newFilter;
                });
                var toShow = projects.filter(function (p) {
                    return newFilter === 'all' || p.getAttribute('data-category') === newFilter;
                });

                function revealItems() {
                    /* Hard-reset hidden items and clean their GSAP state */
                    toHide.forEach(function (item) {
                        gsap.set(item, { display: 'none', clearProps: 'opacity,y' });
                    });
                    /* Animate matching items in from below — same feel as scroll animations */
                    toShow.forEach(function (item) {
                        gsap.set(item, { display: 'block', opacity: 0, y: 50 });
                    });
                    gsap.to(toShow, {
                        opacity:    1,
                        y:          0,
                        duration:   0.55,
                        stagger:    0.09,
                        ease:       'power3.out',
                        clearProps: 'all',
                        onComplete: afterFilter
                    });
                }

                if (toHide.length) {
                    gsap.to(toHide, {
                        opacity:    0,
                        y:          -20,
                        duration:   0.25,
                        stagger:    0.04,
                        ease:       'power2.in',
                        onComplete: revealItems
                    });
                } else {
                    revealItems();
                }
            });
        });
    };

    /* ─────────────────────────────────────────────────────────────────
       INTERACTIONS & EFFECTS
    ───────────────────────────────────────────────────────────────── */

    var scrollProgress = function () {
        var bar     = document.getElementById('scroll-progress');
        if (!bar) return;
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                bar.style.width = ((winScroll / height) * 100) + '%';
                ticking = false;
            });
        }, { passive: true });
    };

    var customCursor = function () {
        if (isMobile.any()) return;
        var cursor   = document.getElementById('cursor');
        var follower = document.getElementById('cursor-follower');
        if (!cursor || !follower) return;

        var mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top  = mouseY + 'px';
        });

        (function loop() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top  = followerY + 'px';
            requestAnimationFrame(loop);
        }());

        var HOVER_TARGETS = 'a, button, input, textarea, select, .project, .skill-tag, .btn, .nav-link, .project-badge, .tag';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(HOVER_TARGETS)) {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
            }
        });
        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(HOVER_TARGETS)) {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
            }
        });
    };

    var magneticElements = function () {
        if (isMobile.any()) return;

        var SELECTOR   = 'a, button, .btn, .colorlib-heading';
        var activeEl   = null;
        var rafPending = false;
        var lastX = 0, lastY = 0;

        function applyMagnetic() {
            rafPending = false;
            if (!activeEl) return;
            var rect   = activeEl.getBoundingClientRect();
            var x      = lastX - rect.left - rect.width  / 2;
            var y      = lastY - rect.top  - rect.height / 2;
            var factor = activeEl.classList.contains('colorlib-heading') ? 0.1 : 0.3;
            gsap.to(activeEl, { x: x * factor, y: y * factor, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }

        document.addEventListener('mousemove', function (e) {
            var el = e.target.closest(SELECTOR);
            if (el && el.closest('#colorlib-aside')) el = null;

            if (el !== activeEl) {
                if (activeEl) {
                    gsap.to(activeEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
                }
                activeEl = el;
            }

            if (activeEl) {
                lastX = e.clientX;
                lastY = e.clientY;
                if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(applyMagnetic);
                }
            }
        });
    };

    var initSpotlightHover = function () {
        document.querySelectorAll('.project, .services, .skill-card').forEach(function (card) {
            card.classList.add('spotlight-card');
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--mouse-y', (e.clientY - rect.top)  + 'px');
            });
        });
    };

    var initSkillMagnifier = function () {
        if (isMobile.any()) return;
        var mag = document.getElementById('skill-magnifier');
        if (!mag) return;

        var ZOOM = 2.0, LENS_R = 75;
        var clone = null, activeCard = null, hideTimeout = null;
        var cursorEl   = document.getElementById('cursor');
        var followerEl = document.getElementById('cursor-follower');

        function buildClone(card) {
            if (clone) { clone.remove(); clone = null; }
            clone = card.cloneNode(true);
            var glare = clone.querySelector('.js-tilt-glare');
            if (glare) glare.remove();
            clone.className   = 'mag-clone';
            clone.style.cssText =
                'position:absolute;pointer-events:none;user-select:none;' +
                'transform-origin:0 0;width:' + card.offsetWidth + 'px;height:' + card.offsetHeight + 'px;' +
                'box-shadow:none;border-radius:0;border:none;transition:none;will-change:transform;' +
                'backdrop-filter:none;-webkit-backdrop-filter:none;';
            mag.appendChild(clone);
            activeCard = card;
        }

        var moveTicking = false;

        function updateLens(cx, cy) {
            if (!clone || !activeCard) return;
            var rect = activeCard.getBoundingClientRect();
            clone.style.left      = (LENS_R - (cx - rect.left) * ZOOM) + 'px';
            clone.style.top       = (LENS_R - (cy - rect.top)  * ZOOM) + 'px';
            clone.style.transform = 'scale(' + ZOOM + ')';
        }

        document.querySelectorAll('.skill-card').forEach(function (card) {
            card.addEventListener('mouseenter', function (e) {
                clearTimeout(hideTimeout);
                buildClone(card);
                mag.style.left    = e.clientX + 'px';
                mag.style.top     = e.clientY + 'px';
                updateLens(e.clientX, e.clientY);
                mag.style.display = 'block';
                void mag.offsetWidth;
                mag.style.opacity = '1';
                if (cursorEl)   cursorEl.style.opacity   = '0';
                if (followerEl) followerEl.style.opacity = '0';
            });
            card.addEventListener('mousemove', function (e) {
                var cx = e.clientX, cy = e.clientY;
                if (moveTicking) return;
                moveTicking = true;
                requestAnimationFrame(function () {
                    mag.style.left = cx + 'px';
                    mag.style.top  = cy + 'px';
                    updateLens(cx, cy);
                    moveTicking = false;
                });
            });
            card.addEventListener('mouseleave', function () {
                mag.style.opacity = '0';
                hideTimeout = setTimeout(function () {
                    mag.style.display = 'none';
                    if (clone) { clone.remove(); clone = null; }
                    activeCard = null;
                }, 200);
                if (cursorEl)   cursorEl.style.opacity   = '1';
                if (followerEl) followerEl.style.opacity = '1';
            });
        });
    };

    var initGlitchTypewriter = function () {
        var GLYPH_POOL      = '!<>-_\\/[]{}—=+*^?#________';
        var SCRAMBLE_FRAMES = 7;
        var MS_PER_TICK     = 28;
        var REVEAL_EVERY    = 2;

        function scrambleReveal(el, original) {
            var phase = 0, revealed = 0, tick_n = 0, timer = null;

            function tick() {
                var out = '', i;
                if (phase === 0) {
                    for (i = 0; i < original.length; i++) {
                        out += original[i] === ' ' ? ' '
                             : GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];
                    }
                    if (++tick_n >= SCRAMBLE_FRAMES) { phase = 1; tick_n = 0; }
                } else {
                    for (i = 0; i < original.length; i++) {
                        if (original[i] === ' ')  out += ' ';
                        else if (i < revealed)    out += original[i];
                        else out += GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];
                    }
                    if (++tick_n % REVEAL_EVERY === 0) revealed++;
                    if (revealed >= original.length) { el.textContent = original; return; }
                }
                el.textContent = out;
                timer = setTimeout(tick, MS_PER_TICK);
            }

            tick();
            return function cancel() { clearTimeout(timer); el.textContent = original; };
        }

        document.querySelectorAll('.btn-hire, .btn-learn, .glitch-btn').forEach(function (btn) {
            var textEl   = btn.querySelector('.btn-text') || btn;
            var original = textEl.textContent.trim();
            var cancel   = null;

            btn.addEventListener('mouseenter', function () {
                if (cancel) cancel();
                cancel = scrambleReveal(textEl, original);
            });
            btn.addEventListener('mouseleave', function () {
                if (cancel) { cancel(); cancel = null; }
                textEl.textContent = original;
            });
        });
    };

    /* ─────────────────────────────────────────────────────────────────
       THIRD-PARTY INTEGRATIONS
    ───────────────────────────────────────────────────────────────── */

    var initSplitText = function () {
        if (typeof SplitType !== 'undefined') {
            new SplitType('.split-text', { types: 'chars' });
        }
    };

    var initTyped = function () {
        if (typeof Typed === 'undefined') return;
        if (document.getElementById('typed-1')) {
            new Typed('#typed-1', { strings: ['Md. Hasan Imon'],           typeSpeed: 60, backSpeed: 40, backDelay: 2000, loop: true });
        }
        if (document.getElementById('typed-2')) {
            new Typed('#typed-2', { strings: ['Full-Stack AI/ML Engineer'], typeSpeed: 60, backSpeed: 40, backDelay: 2000, loop: true });
        }
    };

    var initTilt = function () {
        if (typeof VanillaTilt === 'undefined' || isMobile.any()) return;
        VanillaTilt.init(document.querySelectorAll('.glass-card'), {
            max: 8, speed: 400, glare: true, 'max-glare': 0.2, scale: 1.02
        });
    };

    var initOdometer = function () {
        if (typeof Odometer === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        $('.js-odo').each(function () {
            var el       = this;
            var targetVal = $(el).data('to');
            var odo      = new Odometer({ el: el, value: 0, format: '(,ddd)', theme: 'minimal' });
            ScrollTrigger.create({
                trigger: el,
                start:   'top 90%',
                once:    true,
                onEnter: function () { odo.update(targetVal); }
            });
        });
    };

    var initTerminal = function () {
        if (!$('#terminal-typed').length || typeof Typed === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        ScrollTrigger.create({
            trigger: '.terminal-window',
            start:   'top 80%',
            once:    true,
            onEnter: function () {
                new Typed('#terminal-typed', {
                    strings: [
                        'Initializing agent...<br>> Name: Md Hasan Imon<br>> Role: AI/ML Engineer<br>> Specialty: Agentic RAG, LLM Fine-Tuning<br>> Status: Open to build next-gen AI'
                    ],
                    typeSpeed:  25,
                    startDelay: 500,
                    showCursor: true,
                    cursorChar: '█'
                });
            }
        });
    };

    var initParticles = function () {
        if (!$('#particles-js').length || typeof particlesJS === 'undefined') return;
        if (window.innerWidth < 480) { $('#particles-js').hide(); return; }

        var mobile        = isMobile.any() || window.innerWidth < 768;
        var particleCount = mobile ? 40 : 90;

        particlesJS('particles-js', {
            particles: {
                number:      { value: particleCount, density: { enable: true, value_area: 1000 } },
                color:       { value: ['#6366f1', '#ec4899', '#10b981', '#8b5cf6'] },
                shape:       { type: 'circle' },
                opacity:     { value: 0.5, random: true, anim: { enable: !mobile, speed: 0.5, opacity_min: 0.1, sync: false } },
                size:        { value: mobile ? 3 : 4.5, random: true, anim: { enable: false } },
                line_linked: { enable: !mobile, distance: 180, color: '#64748b', opacity: 0.3, width: 1.2 },
                move:        { enable: true, speed: mobile ? 0.8 : 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: { enable: !mobile, mode: 'grab' },
                    onclick: { enable: false },
                    resize:  true
                },
                modes: { grab: { distance: 250, line_linked: { opacity: 0.6 } } }
            },
            retina_detect: false
        });

        $('#particles-js').on('click', function () {
            if (window.pJSDom && window.pJSDom.length > 0) {
                var pjs = window.pJSDom[0].pJS;
                for (var i = 0; i < 5; i++) {
                    pjs.fn.modes.pushParticles(1, {
                        pos_x: Math.random() * pjs.canvas.w,
                        pos_y: Math.random() * pjs.canvas.h
                    });
                }
            }
        });

        new MutationObserver(function () {
            var isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
            var canvasEl = document.querySelector('.particles-js-canvas-el');
            if (canvasEl) canvasEl.style.filter = isDark ? 'brightness(1.5) contrast(1.2)' : 'none';
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    };

    var initSkillSphere = function () {
        if (!$('#skill-sphere').length || typeof TagCloud === 'undefined') return;
        TagCloud('#skill-sphere', [
            'Python', 'Machine Learning', 'NLP', 'Deep Learning',
            'LangChain', 'Agentic AI', 'RAG', 'VectorDB', 'Pinecone',
            'FastAPI', 'Docker', 'Generative AI', 'LLM Fine-Tuning',
            'PyTorch', 'TensorFlow', 'CrewAI', 'MLOps'
        ], {
            radius:    window.innerWidth < 768 ? 140 : 240,
            maxSpeed:  'normal',
            initSpeed: 'fast',
            direction: 135,
            keep:      true
        });
    };

    /* ─────────────────────────────────────────────────────────────────
       GSAP SCROLL FEATURES
    ───────────────────────────────────────────────────────────────── */

    var initScrubText = function () {
        if (isMobile.any() || window.innerWidth < 768) return;
        if (!$('.scrub-text').length || typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;

        var scrubText = new SplitType('.scrub-text', { types: 'words' });
        gsap.fromTo(scrubText.words,
            { opacity: 0.2 },
            {
                opacity: 1,
                stagger: 0.1,
                ease:    'none',
                scrollTrigger: { trigger: '.scrub-text', start: 'top 80%', end: 'bottom 50%', scrub: true }
            }
        );
    };

    var initParallax = function () {
        if (isMobile.any() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.utils.toArray('.flexslider .slides li').forEach(function (slide) {
            gsap.to(slide, {
                backgroundPosition: '50% 100%',
                ease:               'none',
                scrollTrigger:      { trigger: slide, start: 'top top', end: 'bottom top', scrub: true }
            });
        });

        if ($('#particles-js').length) {
            gsap.to('#particles-js', {
                yPercent:      30,
                ease:          'none',
                scrollTrigger: { trigger: '#colorlib-hero', start: 'top top', end: 'bottom top', scrub: true }
            });
        }
    };

    var initMorphingBlob = function () {
        if (isMobile.any() || window.innerWidth < 768) return;
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        var blobPath = document.getElementById('morph-blob');
        if (!blobPath) return;

        gsap.to(blobPath, {
            attr: { d: 'M47.7,-64.6C60.2,-58.8,69.7,-45.5,76.2,-31.4C82.6,-17.3,86.1,-2.3,82,-10C77.9,-22.3,66.3,-26.8,55.3,-30.6C44.3,-34.4,34,-27.5,21.9,-22.7C9.8,-17.9,-4.1,-15.1,-19.2,-17.4C-34.3,-19.7,-50.5,-27.1,-58.3,-38.4C-66.1,-49.7,-65.4,-64.9,-56.4,-72.3C-47.4,-79.7,-30,-79.4,-15.4,-74.7C-0.8,-70,12.6,-60.6,25.6,-59.6C38.6,-58.6,50.4,-66.3,47.7,-64.6Z' },
            ease:          'none',
            scrollTrigger: { trigger: '.colorlib-about', start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
    };

    var initTextScramble = function () {
        if (isMobile.any() || window.innerWidth < 768) return;
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        $('.colorlib-heading').each(function () {
            var el           = this;
            var originalText = $(el).text();
            ScrollTrigger.create({
                trigger: el,
                start:   'top 90%',
                once:    true,
                onEnter: function () {
                    var obj = { val: 0 };
                    gsap.to(obj, {
                        val:      1,
                        duration: 1.2,
                        ease:     'power1.inOut',
                        onUpdate: function () {
                            var out = '';
                            for (var i = 0; i < originalText.length; i++) {
                                if (originalText[i] === ' ' || i / originalText.length < obj.val) {
                                    out += originalText[i];
                                } else {
                                    out += Math.floor(Math.random() * 2);
                                }
                            }
                            el.textContent = out;
                        },
                        onComplete: function () { el.textContent = originalText; }
                    });
                }
            });
        });
    };

    var initScrollSVG = function () {
        if (isMobile.any() || window.innerWidth < 768) return;
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        var paths = document.querySelectorAll('.circuit-path');
        var nodes = document.querySelectorAll('.circuit-node');
        if (!paths.length) return;

        var scrollConfig = { trigger: '#colorlib-main', start: 'top top', end: 'bottom bottom', scrub: 1 };

        paths.forEach(function (path) {
            var length = path.getTotalLength();
            path.style.strokeDasharray  = length;
            path.style.strokeDashoffset = length;
            gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: scrollConfig });
        });

        gsap.fromTo(nodes,
            { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
            { scale: 1, opacity: 1, ease: 'back.out(1.5)', stagger: 0.1, scrollTrigger: scrollConfig }
        );
    };

    /* ─────────────────────────────────────────────────────────────────
       INIT
    ───────────────────────────────────────────────────────────────── */

    $(function () {
        initPreloader();
        fullHeight();
        burgerMenu();
        clickMenu();
        navigationSection();
        mobileMenuOutsideClick();
        fixAccordion();
        sliderMain();
        scrollProgress();
        customCursor();
        magneticElements();

    /* ─────────────────────────────────────────────────────────────────
       SKILL RADAR CHART
    ───────────────────────────────────────────────────────────────── */
    var initRadarChart = function () {
        var canvas = document.getElementById('skill-radar');
        if (!canvas || typeof Chart === 'undefined') return;

        /* ── Domain data ─────────────────────────────────────── */
        var DOMAINS = [
            { label: 'AI & Agents',     knowledge: 95, production: 90 },
            { label: 'LLM Fine-Tuning', knowledge: 88, production: 85 },
            { label: 'NLP',             knowledge: 87, production: 82 },
            { label: 'ML & DL',         knowledge: 92, production: 88 },
            { label: 'Data Science',    knowledge: 83, production: 78 },
            { label: 'Vector DBs',      knowledge: 87, production: 82 },
            { label: 'Software Eng.',   knowledge: 80, production: 75 },
            { label: 'MLOps',           knowledge: 82, production: 78 },
        ];

        /* Per-label accent colors — match skill card palette */
        var LABEL_COLORS = [
            '#6366f1', '#a855f7', '#f43f5e', '#f59e0b',
            '#10b981', '#06b6d4', '#3b82f6', '#ec4899'
        ];

        var DATASETS = {
            knowledge:  { label: 'Knowledge Depth',  fill: 'rgba(99,102,241,0.18)', stroke: 'rgba(99,102,241,0.9)',  point: '#6366f1' },
            production: { label: 'Production Usage',  fill: 'rgba(168,85,247,0.13)', stroke: 'rgba(168,85,247,0.8)', point: '#a855f7' }
        };

        /* ── Theme-aware grid/label colors ───────────────────── */
        function gridColor(dark) {
            return dark ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.12)';
        }

        /* ── Custom plugin: per-label colored text ───────────── */
        var coloredLabelsPlugin = {
            id: 'coloredLabels',
            afterDraw: function (chart) {
                var scale = chart.scales.r;
                if (!scale) return;
                var ctx   = chart.ctx;
                var dark  = document.documentElement.getAttribute('data-theme') === 'dark';
                scale.ticks; // ensure scale is ready
                var labels = chart.data.labels;
                labels.forEach(function (label, i) {
                    var angle = scale.getIndexAngle(i) - Math.PI / 2;
                    var r     = scale.drawingArea + 18;
                    var x     = scale.xCenter + Math.cos(angle) * r;
                    var y     = scale.yCenter + Math.sin(angle) * r;
                    ctx.save();
                    ctx.fillStyle = LABEL_COLORS[i % LABEL_COLORS.length];
                    ctx.font      = '700 11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor  = LABEL_COLORS[i % LABEL_COLORS.length];
                    ctx.shadowBlur   = dark ? 6 : 0;
                    ctx.fillText(label, x, y);
                    ctx.restore();
                });
            }
        };

        /* ── Level fill plugin: concentric rings with opacity ── */
        var levelFillPlugin = {
            id: 'levelFill',
            beforeDraw: function (chart) {
                var scale = chart.scales.r;
                if (!scale) return;
                var ctx   = chart.ctx;
                var steps = [100, 75, 50, 25];
                var dark  = document.documentElement.getAttribute('data-theme') === 'dark';
                steps.forEach(function (val, i) {
                    var alpha = dark ? (0.03 + i * 0.015) : (0.025 + i * 0.01);
                    var r     = scale.getDistanceFromCenterForValue(val);
                    ctx.save();
                    ctx.beginPath();
                    chart.data.labels.forEach(function (_, idx) {
                        var angle = scale.getIndexAngle(idx) - Math.PI / 2;
                        var x = scale.xCenter + Math.cos(angle) * r;
                        var y = scale.yCenter + Math.sin(angle) * r;
                        idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    });
                    ctx.closePath();
                    ctx.fillStyle = 'rgba(99,102,241,' + alpha + ')';
                    ctx.fill();
                    ctx.restore();
                });
            }
        };

        var dark = document.documentElement.getAttribute('data-theme') === 'dark';

        var chart = new Chart(canvas, {
            type: 'radar',
            plugins: [levelFillPlugin, coloredLabelsPlugin],
            data: {
                labels: DOMAINS.map(function (d) { return d.label; }),
                datasets: [
                    {
                        label:                DATASETS.knowledge.label,
                        data:                 DOMAINS.map(function (d) { return d.knowledge; }),
                        backgroundColor:      DATASETS.knowledge.fill,
                        borderColor:          DATASETS.knowledge.stroke,
                        borderWidth:          2.5,
                        pointBackgroundColor: LABEL_COLORS,
                        pointBorderColor:     '#fff',
                        pointBorderWidth:     2,
                        pointRadius:          6,
                        pointHoverRadius:     9,
                    },
                    {
                        label:                DATASETS.production.label,
                        data:                 DOMAINS.map(function (d) { return d.production; }),
                        backgroundColor:      DATASETS.production.fill,
                        borderColor:          DATASETS.production.stroke,
                        borderWidth:          2,
                        borderDash:           [5, 4],
                        pointBackgroundColor: '#fff',
                        pointBorderColor:     LABEL_COLORS,
                        pointBorderWidth:     2.5,
                        pointRadius:          4,
                        pointHoverRadius:     7,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: { duration: 1400, easing: 'easeInOutQuart' },
                layout: { padding: { top: 24, bottom: 8, left: 24, right: 24 } },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyleWidth: 10,
                            padding: 18,
                            color: dark ? '#94a3b8' : '#334155',
                            font: { size: 12, family: 'Inter, sans-serif', weight: '500' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15,23,42,0.92)',
                        titleColor: '#a5b4fc',
                        bodyColor:  '#e2e8f0',
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            title: function (items) { return items[0].label; },
                            label: function (ctx) {
                                var icon = ctx.datasetIndex === 0 ? '◆' : '◇';
                                return '  ' + icon + ' ' + ctx.dataset.label + ': ' + ctx.raw + ' / 100';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: { stepSize: 25, display: false, backdropPadding: 0 },
                        grid:       { color: gridColor(dark), lineWidth: 1 },
                        angleLines: { color: gridColor(dark), lineWidth: 1 },
                        pointLabels: {
                            /* labels drawn by coloredLabelsPlugin — hide default */
                            display: false
                        }
                    }
                }
            }
        });

        /* ── Theme-change observer ───────────────────────────── */
        new MutationObserver(function () {
            var d  = document.documentElement.getAttribute('data-theme') === 'dark';
            var gc = gridColor(d);
            chart.options.scales.r.grid.color       = gc;
            chart.options.scales.r.angleLines.color  = gc;
            chart.options.plugins.legend.labels.color = d ? '#94a3b8' : '#334155';
            chart.update();
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    };

    /* ─────────────────────────────────────────────────────────────────
       AI CHATBOT  (Groq API — llama-3.3-70b-versatile)
       Replace GROQ_API_KEY with your actual key from console.groq.com
    ───────────────────────────────────────────────────────────────── */
    var initChatbot = function () {
        /* ── Config ──────────────────────────────────────────────
           Point CHAT_SERVER at wherever server.py is running.
           Local dev:  'http://localhost:5000'
           Deployed:   'https://your-server.com'
        ─────────────────────────────────────────────────────── */
        /* Auto-detect: full URL on localhost, relative URL on Vercel */
        var isLocal      = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        var CHAT_SERVER  = isLocal ? 'http://localhost:5000' : '';
        var MAX_HISTORY  = 20;   /* message objects to keep in memory */

        /* ── DOM refs ─────────────────────────────────────────── */
        var panel      = document.getElementById('chat-panel');
        var toggle     = document.getElementById('chat-toggle');
        var closeBtn   = document.getElementById('chat-close');
        var messagesEl = document.getElementById('chat-messages');
        var inputEl    = document.getElementById('chat-input');
        var sendBtn    = document.getElementById('chat-send');
        var suggestions = document.querySelectorAll('.chat-suggest');

        if (!panel || !toggle) return;

        var history = [];   /* [{role:'user'|'assistant', content:'...'}] */
        var isOpen  = false;

        /* ── Panel open / close ───────────────────────────────── */
        function openPanel() {
            isOpen = true;
            panel.classList.add('open');
            panel.setAttribute('aria-hidden', 'false');
            inputEl.focus();
        }

        function closePanel() {
            isOpen = false;
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
        }

        toggle.addEventListener('click', function () {
            isOpen ? closePanel() : openPanel();
        });
        closeBtn.addEventListener('click', closePanel);

        /* ── Message rendering ────────────────────────────────── */
        function appendMsg(role, html) {
            var div = document.createElement('div');
            div.className = 'chat-msg ' + role;
            var isBot = role === 'bot' || role === 'bot typing';
            div.innerHTML = isBot
                ? '<div class="msg-avatar"><i class="icon-bulb"></i></div><div class="msg-bubble">' + html + '</div>'
                : '<div class="msg-bubble">' + html + '</div>';
            messagesEl.appendChild(div);
            messagesEl.scrollTop = messagesEl.scrollHeight;
            return div;
        }

        function showTyping() {
            return appendMsg('bot typing',
                '<div class="typing-dots"><span></span><span></span><span></span></div>');
        }

        function escHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function formatResponse(text) {
            return escHtml(text)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g,     '<em>$1</em>')
                .replace(/`(.*?)`/g,       '<code style="background:rgba(99,102,241,0.12);padding:1px 5px;border-radius:4px;font-size:0.9em">$1</code>')
                .replace(/\n/g, '<br>');
        }

        function hideSuggestions() {
            var el = document.getElementById('chat-suggestions');
            if (el) el.style.display = 'none';
        }

        /* ── Core: send message to Python backend ─────────────── */
        async function sendMessage(text) {
            text = text.trim();
            if (!text || sendBtn.disabled) return;

            hideSuggestions();
            appendMsg('user', escHtml(text));

            /* Add to history BEFORE the fetch so the server sees it */
            history.push({ role: 'user', content: text });
            if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);

            inputEl.value    = '';
            sendBtn.disabled = true;
            var typingEl     = showTyping();

            try {
                var res = await fetch(CHAT_SERVER + '/api/chat', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        message: text,
                        /* send history EXCLUDING the current message we just pushed */
                        history: history.slice(0, -1)
                    })
                });

                if (!res.ok) throw new Error('Server responded ' + res.status);

                var data  = await res.json();
                var reply = (data.reply || '').trim();

                typingEl.remove();
                appendMsg('bot', formatResponse(reply));
                history.push({ role: 'assistant', content: reply });

            } catch (err) {
                typingEl.remove();
                /* Pop the unanswered user turn so history stays clean */
                history.pop();
                appendMsg('bot',
                    'The AI server isn\'t reachable right now. '
                    + 'Make sure <code style="font-size:0.9em">python run.py</code> is running locally, '
                    + 'or email <a href="mailto:emon.mlengineer@gmail.com" style="color:#6366f1">emon.mlengineer@gmail.com</a>.'
                );
            }

            sendBtn.disabled = false;
            inputEl.focus();
        }

        /* ── Event bindings ───────────────────────────────────── */
        sendBtn.addEventListener('click', function () { sendMessage(inputEl.value); });

        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputEl.value);
            }
        });

        suggestions.forEach(function (btn) {
            btn.addEventListener('click', function () { sendMessage(btn.textContent.trim()); });
        });
    };

        setTimeout(function () {
            initTyped();
            initTilt();
            initSplitText();
            initOdometer();
            initTerminal();
            initParticles();
            initSkillSphere();
            initProjectModals();
            initProjectFilterFlip();
            initScrubText();
            initParallax();
            initMorphingBlob();
            initTextScramble();
            initSkillMagnifier();
            initThemeToggle();
            initSpotlightHover();
            initScrollSVG();
            initGlitchTypewriter();
            initRadarChart();
            initChatbot();
        }, 100);
    });

}());
