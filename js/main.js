/**
 * Portfolio Main JavaScript
 * Author: Md. Hasan Imon
 */

;(function () {
    'use strict';

    /* ---- Mobile detection ---- */
    var isMobile = {
        any: function() {
            return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
        }
    };

    /* ---- Full-height hero ---- */
    var fullHeight = function() {
        if (isMobile.any()) return; // Skip forced height on mobile to allow natural scrolling
        var setHeight = function() {
            $('.js-fullheight').css('height', window.innerHeight + 'px');
        };
        setHeight();
        $(window).on('resize', setHeight);
        $(window).on('orientationchange', setHeight);
    };


    var initSplitText = function() {
        if (typeof SplitType !== 'undefined') {
            new SplitType('.split-text', { types: 'chars' });
        }
    };

    var initOdometer = function() {
        if (typeof Odometer !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            $('.js-odo').each(function() {
                var el = this;
                var targetVal = $(el).data('to');
                var odo = new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd)',
                    theme: 'minimal'
                });

                ScrollTrigger.create({
                    trigger: el,
                    start: "top 90%",
                    onEnter: function() {
                        odo.update(targetVal);
                    },
                    once: true
                });
            });
        }
    };

    var initPreloader = function() {
        if ($('.ai-preloader').length && typeof gsap !== 'undefined') {
            var progress = { val: 0 };
            gsap.to(progress, {
                val: 100,
                duration: 1.8,
                ease: "power2.inOut",
                onUpdate: function() {
                    $('.preloader-percent').text(Math.round(progress.val));
                    $('.preloader-bar').css('width', progress.val + '%');
                },
                onComplete: function() {
                    gsap.to('.ai-preloader', {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power3.inOut",
                        onComplete: function() {
                            $('.ai-preloader').remove();
                        }
                    });
                }
            });
        }
    };

    var initTerminal = function() {
        if ($('#terminal-typed').length && typeof Typed !== 'undefined') {
            // Use IntersectionObserver or ScrollTrigger to start typing only when in view
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: '.terminal-window',
                    start: "top 80%",
                    once: true,
                    onEnter: function() {
                        new Typed('#terminal-typed', {
                            strings: [
                                "Initializing agent...<br>> Name: Md Hasan Imon<br>> Role: AI/ML Engineer<br>> Specialty: Agentic RAG, LLM Fine-Tuning<br>> Status: Open to build next-gen AI",
                            ],
                            typeSpeed: 25,
                            startDelay: 500,
                            showCursor: true,
                            cursorChar: 'â–ˆ'
                        });
                    }
                });
            }
        }
    };

    var initMarquee = function() {
        if ($('.marquee-content').length && typeof gsap !== 'undefined') {
            gsap.to('.marquee-content', {
                xPercent: -50,
                ease: "none",
                duration: 25,
                repeat: -1
            });
        }
    };

    var initParticles = function() {
        if ($('#particles-js').length && typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 126, "density": { "enable": true, "value_area": 1000 } },
                    "color": { "value": ["#6366f1", "#ec4899", "#10b981", "#8b5cf6"] },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 4.5, "random": true, "anim": { "enable": true, "speed": 1.5, "size_min": 0.1, "sync": false } },
                    "line_linked": { "enable": true, "distance": 180, "color": "#64748b", "opacity": 0.3, "width": 1.2 },
                    "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": false },
                        "resize": true
                    },
                    "modes": {
                        "grab": { "distance": 250, "line_linked": { "opacity": 0.6 } }
                    }
                },
                "retina_detect": true
            });

            $('#particles-js').on('click', function() {
                if (window.pJSDom && window.pJSDom.length > 0) {
                    var pjs = window.pJSDom[0].pJS;
                    for (var i = 0; i < 5; i++) {
                        var randX = Math.random() * pjs.canvas.w;
                        var randY = Math.random() * pjs.canvas.h;
                        pjs.fn.modes.pushParticles(1, { pos_x: randX, pos_y: randY });
                    }
                }
            });

            var networkObserver = new MutationObserver(function() {
                var isDark = document.body.getAttribute('data-theme') === 'dark';
                var canvasEl = document.querySelector('.particles-js-canvas-el');
                if (canvasEl) canvasEl.style.filter = isDark ? 'brightness(1.5) contrast(1.2)' : 'none';
            });
            networkObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
        }
    };



    var initSkillSphere = function() {
        if ($('#skill-sphere').length && typeof TagCloud !== 'undefined') {
            var myTags = [
                'Python', 'Machine Learning', 'NLP', 'Deep Learning', 
                'LangChain', 'Agentic AI', 'RAG', 'VectorDB', 'Pinecone',
                'FastAPI', 'Docker', 'Generative AI', 'LLM Fine-Tuning',
                'PyTorch', 'TensorFlow', 'CrewAI', 'MLOps'
            ];
            
            // Sphere radius depends on screen size
            var radius = window.innerWidth < 768 ? 140 : 240;
            
            TagCloud('#skill-sphere', myTags, {
                radius: radius,
                maxSpeed: 'normal',
                initSpeed: 'fast',
                direction: 135,
                keep: true
            });
        }
    };

    var initProjectModals = function() {
        $('.project-item').on('click', function(e) {
            e.preventDefault();
            var title = $(this).find('h3 a').text();
            var desc = $(this).find('.project-desc').text();
            var link = $(this).find('.project-footer a').attr('href');
            var category = $(this).data('category');
            if (category) {
                category = category.replace('-', ' ');
            } else {
                category = 'Project';
            }
            var bgImg = $(this).find('.project-thumb-inner').css('background-image');
            
            // Grab tags
            var tagsHtml = $(this).find('.project-tags').html();
            
            // Populate Modal
            $('#modal-title').text(title);
            $('#modal-desc').text(desc);
            $('#modal-link').attr('href', link);
            $('#modal-category').text(category);
            $('#modal-tags').html(tagsHtml);
            $('#modal-image').css('background-image', bgImg);
            
            // Open Modal via GSAP
            $('#project-modal').css('display', 'flex');
            gsap.to('#project-modal', { opacity: 1, duration: 0.3 });
            gsap.fromTo('.modal-content-wrap', 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
            );
        });
        
        $('.modal-close, .modal-backdrop').on('click', function() {
            gsap.to('.modal-content-wrap', { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" });
            gsap.to('#project-modal', { 
                opacity: 0, 
                duration: 0.3, 
                onComplete: function() {
                    $('#project-modal').css('display', 'none');
                }
            });
        });
    };

    /* ---- Mobile burger menu ---- */
    var burgerMenu = function() {
        $('.js-colorlib-nav-toggle').on('click', function(e) {
            e.preventDefault();
            var isOpen = $('body').hasClass('offcanvas');
            $('body').toggleClass('offcanvas', !isOpen);
            $(this).toggleClass('active', !isOpen);
        });
    };

    var mobileMenuOutsideClick = function() {
        $(document).on('click', function(e) {
            if ($('body').hasClass('offcanvas') &&
                !$(e.target).closest('#colorlib-aside, .js-colorlib-nav-toggle').length) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
        });
    };

    /* ---- Active nav state ---- */
    var navActive = function(section) {
        var $ul = $('#navbar > ul');
        $ul.find('li').removeClass('active');
        $ul.find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    };

    /* ---- Click menu: set active + immediately animate the target section ---- */
    var clickMenu = function() {
        $('#navbar a:not([class="external"])').on('click', function(e) {
            e.preventDefault();
            var section = $(this).data('nav-section');
            navActive(section);

            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
        });
    };

    /* ---- Scroll-based nav highlighting ---- */
    var navigationSection = function() {
        var $section = $('section[data-section]');
        $section.waypoint(function(direction) {
            if (direction === 'down') navActive($(this.element).data('section'));
        }, { offset: '150px' });

        $section.waypoint(function(direction) {
            if (direction === 'up')  navActive($(this.element).data('section'));
        }, { offset: function() { return -$(this.element).height() + 155; } });
    };

    /* ---- Hero Flexslider ---- */
    var sliderMain = function() {
        $('#colorlib-hero .flexslider').flexslider({
            animation: 'slide',
            slideshowSpeed: 5000,
            animationSpeed: 700,
            directionNav: false,
            controlNav: true,
            pauseOnHover: true,
            start: function() {
                setTimeout(function() {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function() {
                setTimeout(function() {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
        });
    };

    /* ---- Premium Animations & Behaviors ---- */

    // 1. Scroll Progress Bar
    var scrollProgress = function() {
        var bar = document.getElementById('scroll-progress');
        if (!bar) return;
        window.addEventListener('scroll', function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            bar.style.width = ((winScroll / height) * 100) + '%';
        }, { passive: true });
    };

    // 2. Custom Cursor
    var customCursor = function() {
        if (isMobile.any()) return; // Disable on mobile

        var cursor = document.getElementById("cursor");
        var cursorFollower = document.getElementById("cursor-follower");
        
        if (!cursor || !cursorFollower) return;

        var mouseX = 0, mouseY = 0;
        var followerX = 0, followerY = 0;

        document.addEventListener("mousemove", function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the inner dot
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        });

        // Smooth follower
        function loop() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursorFollower.style.left = followerX + "px";
            cursorFollower.style.top = followerY + "px";

            requestAnimationFrame(loop);
        }
        loop();

        // Hover states on links and buttons using event delegation
        document.addEventListener('mouseover', function(e) {
            var target = e.target.closest('a, button, input, textarea, select, .project, .skill-tag, .btn, .nav-link, .project-badge, .tag');
            if (target) {
                cursor.classList.add('hovered');
                cursorFollower.classList.add('hovered');
            }
        });

        document.addEventListener('mouseout', function(e) {
            var target = e.target.closest('a, button, input, textarea, select, .project, .skill-tag, .btn, .nav-link, .project-badge, .tag');
            if (target) {
                cursor.classList.remove('hovered');
                cursorFollower.classList.remove('hovered');
            }
        });
    };

    // 3. Magnetic Elements (Buttons & Text) with GSAP
    var magneticElements = function() {
        if (isMobile.any()) return;
        
        var elements = document.querySelectorAll('a, button, .btn, .colorlib-heading');
        elements.forEach(function(el) {
            if (el.closest('#colorlib-aside')) return;
            
            el.addEventListener('mousemove', function(e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2; 
                var y = e.clientY - rect.top - rect.height / 2;  
                
                var isText = el.classList.contains('colorlib-heading');
                var factor = isText ? 0.1 : 0.3;
                
                gsap.to(el, {
                    x: x * factor,
                    y: y * factor,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
            
            el.addEventListener('mouseleave', function() {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: "auto"
                });
            });
        });
    };

    // 4. Typing Effect
    var initTyped = function() {
        if (typeof Typed !== 'undefined') {
            if (document.getElementById('typed-1')) {
                new Typed('#typed-1', {
                    strings: ["Md. Hasan Imon"],
                    typeSpeed: 60,
                    backSpeed: 40,
                    backDelay: 2000,
                    loop: true
                });
            }

            if (document.getElementById('typed-2')) {
                new Typed('#typed-2', {
                    strings: ["Full-Stack AI/ML Engineer"],
                    typeSpeed: 60,
                    backSpeed: 40,
                    backDelay: 2000,
                    loop: true
                });
            }
        }
    };

    // 5. VanillaTilt Initialization
    var initTilt = function() {
        if (typeof VanillaTilt !== 'undefined' && !isMobile.any()) {
            VanillaTilt.init(document.querySelectorAll(".glass-card"), {
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.02
            });
        }
    };




    var initThemeToggle = function() {
        var themeToggleBtn = document.getElementById('theme-toggle');
        var icon = themeToggleBtn.querySelector('i');
        
        // Check for saved theme
        var currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            icon.className = 'icon-sun2';
        }

        themeToggleBtn.addEventListener('click', function() {
            var isDark = document.body.getAttribute('data-theme') === 'dark';
            var newTheme = isDark ? 'light' : 'dark';

            // Native smooth color transition using background mesh is already handled by CSS
            document.body.setAttribute('data-theme', newTheme);
            icon.className = isDark ? 'icon-moon' : 'icon-sun2';
            
            // GSAP pulse animation on button click
            if (typeof gsap !== 'undefined') {
                gsap.to(themeToggleBtn, {
                    scale: 1.3,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            }
            
            localStorage.setItem('theme', newTheme);
        });
    };

    var initSpotlightHover = function() {
        // Add spotlight-card class to specific cards
        document.querySelectorAll('.project, .services, .skill-card').forEach(function(card) {
            card.classList.add('spotlight-card');
            
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            });
        });
    };

    var initScrollSVG = function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        var paths = document.querySelectorAll('.circuit-path');
        var nodes = document.querySelectorAll('.circuit-node');

        if (paths.length === 0) return;

        paths.forEach(function(path) {
            var length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "#colorlib-main",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        });

        gsap.fromTo(nodes,
            { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
            {
                scale: 1,
                opacity: 1,
                ease: "back.out(1.5)",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: "#colorlib-main",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            }
        );
    };



    var initSkillMagnifier = function() {
        if (isMobile.any()) return;

        var mag = document.getElementById('skill-magnifier');
        if (!mag) return;

        var ZOOM = 2.0;
        var LENS_R = 75; // half of 150px lens diameter
        var skillCards = document.querySelectorAll('.skill-card');
        var hideTimeout = null;
        var clone = null;
        var activeCard = null;
        var cursorEl = document.getElementById('cursor');
        var followerEl = document.getElementById('cursor-follower');

        function buildClone(card) {
            if (clone) { clone.remove(); clone = null; }
            clone = card.cloneNode(true);
            var glare = clone.querySelector('.js-tilt-glare');
            if (glare) glare.remove();
            clone.className = 'mag-clone';
            clone.style.cssText =
                'position:absolute;pointer-events:none;user-select:none;' +
                'transform-origin:0 0;width:' + card.offsetWidth + 'px;height:' + card.offsetHeight + 'px;' +
                'box-shadow:none;border-radius:0;border:none;' +
                'transition:none;will-change:transform;' +
                'backdrop-filter:none;-webkit-backdrop-filter:none;';
            mag.appendChild(clone);
            activeCard = card;
        }

        function updateLens(e) {
            if (!clone || !activeCard) return;
            var rect = activeCard.getBoundingClientRect();
            var rx = e.clientX - rect.left;
            var ry = e.clientY - rect.top;
            // position clone so that cursor point on card appears at lens center
            clone.style.left      = (LENS_R - rx * ZOOM) + 'px';
            clone.style.top       = (LENS_R - ry * ZOOM) + 'px';
            clone.style.transform = 'scale(' + ZOOM + ')';
        }

        skillCards.forEach(function(card) {
            card.addEventListener('mouseenter', function(e) {
                if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
                buildClone(card);
                mag.style.left = e.clientX + 'px';
                mag.style.top  = e.clientY + 'px';
                updateLens(e);
                mag.style.display = 'block';
                void mag.offsetWidth;
                mag.style.opacity = '1';
                if (cursorEl) cursorEl.style.opacity = '0';
                if (followerEl) followerEl.style.opacity = '0';
            });

            card.addEventListener('mousemove', function(e) {
                mag.style.left = e.clientX + 'px';
                mag.style.top  = e.clientY + 'px';
                updateLens(e);
            });

            card.addEventListener('mouseleave', function() {
                mag.style.opacity = '0';
                hideTimeout = setTimeout(function() {
                    mag.style.display = 'none';
                    if (clone) { clone.remove(); clone = null; }
                    activeCard = null;
                }, 200);
                if (cursorEl) cursorEl.style.opacity = '1';
                if (followerEl) followerEl.style.opacity = '1';
            });
        });
    };


    var initGlitchTypewriter = function() {
        var glyphPool = '!<>-_\\/[]{}—=+*^?#________';
        var SCRAMBLE_FRAMES = 7;   // pure-glitch phase count
        var MS_PER_TICK     = 28;  // ~36fps — snappier
        var REVEAL_EVERY    = 2;   // reveal 1 char every N ticks

        function scrambleReveal(el, original) {
            var phase = 0;       // 0 = pure scramble, 1 = reveal
            var revealed = 0;
            var tick_n = 0;
            var timer = null;

            function tick() {
                var out = '';
                if (phase === 0) {
                    for (var i = 0; i < original.length; i++) {
                        out += original[i] === ' ' ? ' '
                             : glyphPool[Math.floor(Math.random() * glyphPool.length)];
                    }
                    if (++tick_n >= SCRAMBLE_FRAMES) { phase = 1; tick_n = 0; }
                } else {
                    for (var i = 0; i < original.length; i++) {
                        if (original[i] === ' ')        out += ' ';
                        else if (i < revealed)          out += original[i];
                        else out += glyphPool[Math.floor(Math.random() * glyphPool.length)];
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

        var SELECTOR = '.btn-hire, .btn-learn, .glitch-btn';
        document.querySelectorAll(SELECTOR).forEach(function(btn) {
            var textEl = btn.querySelector('.btn-text') || btn;
            var original = textEl.textContent.trim();
            var cancel = null;

            btn.addEventListener('mouseenter', function() {
                if (cancel) cancel();
                cancel = scrambleReveal(textEl, original);
            });
            btn.addEventListener('mouseleave', function() {
                if (cancel) { cancel(); cancel = null; }
                textEl.textContent = original;
            });
        });
    };

    $(function(){

        initPreloader();
        fullHeight();
        burgerMenu();
        clickMenu();
        navigationSection();
        mobileMenuOutsideClick();
        sliderMain();
        
        // Premium Animations
        scrollProgress();
        customCursor();
        magneticElements();
        

    var initScrubText = function() {
        if ($('.scrub-text').length && typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
            const scrubText = new SplitType('.scrub-text', { types: 'words' });
            
            gsap.fromTo(scrubText.words, 
                { opacity: 0.2 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".scrub-text",
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: true
                    }
                }
            );
        }
    };

    var initParallax = function() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !isMobile.any()) {
            // Hero Images Parallax
            gsap.utils.toArray('.flexslider .slides li').forEach(function(slide) {
                gsap.to(slide, {
                    backgroundPosition: "50% 100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: slide,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
            
            // Particles Parallax
            if ($('#particles-js').length) {
                gsap.to('#particles-js', {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#colorlib-hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        }
    };

    var initHoverReveal = function() {
        if (isMobile.any() || typeof gsap === 'undefined') return;
        
        var container = document.getElementById('hover-reveal-container');
        var revealImg = document.getElementById('hover-reveal-img');
        var services = document.querySelectorAll('.services[data-hover-img]');
        
        if (!container || !revealImg) return;
        
        services.forEach(function(service) {
            service.addEventListener('mouseenter', function() {
                var imgSrc = this.getAttribute('data-hover-img');
                if (imgSrc) {
                    revealImg.style.backgroundImage = 'url(' + imgSrc + ')';
                    gsap.to(container, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
                }
            });
            
            service.addEventListener('mouseleave', function() {
                gsap.to(container, { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
            });
            
            service.addEventListener('mousemove', function(e) {
                gsap.to(container, { 
                    x: e.clientX, 
                    y: e.clientY, 
                    duration: 0.4, 
                    ease: "power3.out" 
                });
            });
        });
    };

    var initProjectFilterFlip = function() {
        if (typeof gsap === 'undefined') return;

        var filters = document.querySelectorAll('.work-menu a');
        var projects = Array.from(document.querySelectorAll('.project-item'));
        var projectsContainer = document.querySelector('#projects');

        if (!projectsContainer || !projects.length) return;

        var isAnimating = false;
        var currentFilter = 'all';

        filters.forEach(function(filter) {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                if (isAnimating) return;

                var filterValue = this.getAttribute('data-filter');
                if (filterValue === currentFilter) return;

                filters.forEach(function(f) { f.classList.remove('active'); });
                this.classList.add('active');
                currentFilter = filterValue;
                isAnimating = true;

                var leaving = [];
                var entering = [];

                projects.forEach(function(project) {
                    var category = project.getAttribute('data-category');
                    var isVisible = project.style.display !== 'none';
                    var willMatch = filterValue === 'all' || category === filterValue;

                    if (isVisible && !willMatch) leaving.push(project);
                    else if (!isVisible && willMatch) entering.push(project);
                });

                var showEntering = function() {
                    leaving.forEach(function(item) {
                        gsap.set(item, { display: 'none' });
                    });

                    if (entering.length) {
                        entering.forEach(function(item) {
                            gsap.set(item, { display: 'block', opacity: 0 });
                        });

                        gsap.to(entering, {
                            opacity: 1,
                            duration: 0.55,
                            stagger: 0.1,
                            ease: 'power3.out',
                            clearProps: 'all',
                            onComplete: function() {
                                isAnimating = false;
                                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                                if (window.lenis) window.lenis.resize();
                            }
                        });
                    } else {
                        isAnimating = false;
                        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                        if (window.lenis) window.lenis.resize();
                    }
                };

                if (leaving.length) {
                    gsap.to(leaving, {
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.in',
                        onComplete: showEntering
                    });
                } else {
                    showEntering();
                }
            });
        });
    };

    var initMorphingBlob = function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        var blobPath = document.getElementById('morph-blob');
        if (blobPath) {
            // Path with identical point count for morphing
            var shape2 = "M47.7,-64.6C60.2,-58.8,69.7,-45.5,76.2,-31.4C82.6,-17.3,86.1,-2.3,82,-10C77.9,-22.3,66.3,-26.8,55.3,-30.6C44.3,-34.4,34,-27.5,21.9,-22.7C9.8,-17.9,-4.1,-15.1,-19.2,-17.4C-34.3,-19.7,-50.5,-27.1,-58.3,-38.4C-66.1,-49.7,-65.4,-64.9,-56.4,-72.3C-47.4,-79.7,-30,-79.4,-15.4,-74.7C-0.8,-70,12.6,-60.6,25.6,-59.6C38.6,-58.6,50.4,-66.3,47.7,-64.6Z";
            
            gsap.to(blobPath, {
                attr: { d: shape2 },
                ease: "none",
                scrollTrigger: {
                    trigger: ".colorlib-about",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }
    };

    var initTextScramble = function() {
        if (typeof gsap === 'undefined') return;
        
        $('.colorlib-heading').each(function() {
            var el = this;
            var originalText = $(el).text();
            
            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                onEnter: function() {
                    let obj = { val: 0 };
                    gsap.to(obj, {
                        val: 1,
                        duration: 1.2,
                        ease: "power1.inOut",
                        onUpdate: () => {
                            let currentText = "";
                            for(let i=0; i<originalText.length; i++) {
                                if(originalText[i] === " ") {
                                    currentText += " ";
                                } else if (i / originalText.length < obj.val) {
                                    currentText += originalText[i];
                                } else {
                                    // Random binary for scramble effect
                                    currentText += Math.floor(Math.random() * 2);
                                }
                            }
                            $(el).text(currentText);
                        },
                        onComplete: () => $(el).text(originalText)
                    });
                },
                once: true
            });
        });
    };




        // Wait slightly for external scripts to load if needed
        setTimeout(function() {
            initTyped();
            initTilt();
            initSplitText();
            initOdometer();
            initTerminal();
            initMarquee();
            initParticles();
            initSkillSphere();
            initProjectModals();
            initScrubText();
            
            // New GSAP Features
            initParallax();
            // initHoverReveal();
            initProjectFilterFlip();
            initMorphingBlob();
            initTextScramble();

            // Premium Added Features
            initSkillMagnifier();
            
            // GSAP Dynamic Examples
            
            // AI Futuristic Animated Additions



            initThemeToggle();
            initSpotlightHover();
            initScrollSVG();
            initGlitchTypewriter();

        }, 100);
    });

}());

