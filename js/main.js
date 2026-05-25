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
                    onComplete: function () {
                        $('.ai-preloader').remove();
                        /* Start scroll animations only NOW — after preloader exits,
                           so users always see elements animate as they scroll */
                        if (window.ScrollAnimator) window.ScrollAnimator.refresh();
                    }
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
            pauseOnHover:   false,
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
            
            // Hide custom cursor inside chat widget
            if (e.target.closest('#chat-widget')) {
                cursor.style.display = 'none';
                follower.style.display = 'none';
            } else {
                cursor.style.display = 'block';
                follower.style.display = 'block';
            }
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
            new Typed('#typed-1', {
                strings: ['Machine Learning Engineer', 'AI Systems Architect', 'LLM Fine-Tuner'],
                typeSpeed: 58, backSpeed: 36, backDelay: 2200, startDelay: 300, loop: true
            });
        }
        if (document.getElementById('typed-2')) {
            new Typed('#typed-2', {
                strings: ['Building Agentic AI', 'Designing LLM Solutions', 'Crafting ML Systems'],
                typeSpeed: 58, backSpeed: 36, backDelay: 2200, startDelay: 300, loop: true
            });
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
        var particleCount = mobile ? 42 : 95;

        particlesJS('particles-js', {
            particles: {
                number:      { value: particleCount, density: { enable: true, value_area: 1000 } },
                color:       { value: ['#4f46e5', '#db2777', '#059669', '#7c3aed'] },
                shape:       { type: 'circle' },
                opacity:     { value: 0.78, random: true, anim: { enable: !mobile, speed: 0.6, opacity_min: 0.25, sync: false } },
                size:        { value: mobile ? 3.5 : 5, random: true, anim: { enable: false } },
                line_linked: { enable: !mobile, distance: 180, color: '#a5b4fc', opacity: 0.45, width: 1.4 },
                move:        { enable: true, speed: mobile ? 0.8 : 1.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: { enable: !mobile, mode: 'grab' },
                    onclick: { enable: false },
                    resize:  true
                },
                modes: { grab: { distance: 250, line_linked: { opacity: 0.7 } } }
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

        var applyParticleFilter = function () {
            var isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
            var canvasEl = document.querySelector('.particles-js-canvas-el');
            if (canvasEl) canvasEl.style.filter = isDark ? 'brightness(2.8) contrast(1.2) saturate(1.6)' : 'none';
        };
        new MutationObserver(applyParticleFilter).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        applyParticleFilter();
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
       AI CHATBOT  (Groq API — llama-3.3-70b-versatile)
       Replace GROQ_API_KEY with your actual key from console.groq.com
    ───────────────────────────────────────────────────────────────── */
    var initChatbot = function () {
        /* ── Config ──────────────────────────────────────────────
           Point CHAT_SERVER at wherever server.py is running.
           Local dev:  'http://localhost:5000'
           Deployed:   'https://your-server.com'
        ─────────────────────────────────────────────────────── */
        /* Auto-detect: full URL on localhost, relative URL on production */
        var isLocal      = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        var CHAT_SERVER  = isLocal ? 'http://localhost:8080' : '';
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

        /* Prevent page scroll when mouse wheel is used inside chat messages */
        messagesEl.addEventListener('wheel', function(e) {
            var atTop    = messagesEl.scrollTop === 0;
            var atBottom = messagesEl.scrollTop + messagesEl.clientHeight >= messagesEl.scrollHeight - 1;
            if (!(atTop && e.deltaY < 0) && !(atBottom && e.deltaY > 0)) {
                e.stopPropagation();
            }
            e.preventDefault();
            messagesEl.scrollTop += e.deltaY;
        }, { passive: false });

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

        /* Auto-open chatbot after 15 seconds (only once per session) */
        setTimeout(function () {
            if (!isOpen) openPanel();
        }, 15000);

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
            /* Extract markdown links before HTML-escaping so URLs survive */
            var links = [];
            var tokenised = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function(_, label, url) {
                var idx = links.length;
                links.push({ label: escHtml(label), url: escHtml(url) });
                return '\x00L' + idx + '\x00';
            });
            var out = escHtml(tokenised)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g,     '<em>$1</em>')
                .replace(/`(.*?)`/g,       '<code style="background:rgba(99,102,241,0.12);padding:1px 5px;border-radius:4px;font-size:0.9em">$1</code>')
                .replace(/\n/g, '<br>');
            /* Re-inject clickable links */
            links.forEach(function(l, i) {
                out = out.replace('\x00L' + i + '\x00',
                    '<a href="' + l.url + '" target="_blank" rel="noopener" ' +
                    'style="color:#6366f1;font-weight:600;text-decoration:underline">' + l.label + '</a>');
            });
            return out;
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
            initChatbot();
        }, 100);
    });

}());
