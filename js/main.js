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

    var prefersReducedMotion = function() {
        return false;
    };

    var registerGsapPlugins = function() {
        if (typeof gsap === 'undefined') return false;

        var plugins = [];
        if (typeof ScrollTrigger !== 'undefined') plugins.push(ScrollTrigger);
        if (typeof TextPlugin !== 'undefined') plugins.push(TextPlugin);
        if (typeof MotionPathPlugin !== 'undefined') plugins.push(MotionPathPlugin);
        if (typeof Flip !== 'undefined') plugins.push(Flip);

        if (plugins.length) gsap.registerPlugin.apply(gsap, plugins);
        return true;
    };

    var siblingCardIndex = function(el) {
        var parent = el.parentElement;
        if (!parent) return 0;

        return Array.prototype.indexOf.call(parent.children, el);
    };

    var shouldAlternateFromSides = function(el) {
        return el.matches(
            '.colorlib-services .animate-box, ' +
            '.colorlib-about .col-md-3.animate-box, ' +
            '.colorlib-counters .animate-box, ' +
            '.skill-card.animate-box, ' +
            '.colorlib-blog .animate-box, ' +
            '.cert-card.animate-box, ' +
            '.project-item.animate-box'
        );
    };

    var revealVarsFor = function(effect, el) {
        var distance = isMobile.any() ? 40 : 100;

        // Custom staggered entrance depending on layout
        if (el && shouldAlternateFromSides(el)) {
            var sideIndex = siblingCardIndex(el);
            var xOffset = -distance; // default left
            var yOffset = distance * 0.8;
            
            var is3Col = el.classList.contains('col-md-4') || el.closest('.col-md-4') || (el.parentElement && el.parentElement.classList.contains('project-grid'));
            var is2Col = el.classList.contains('col-md-6') || el.closest('.col-md-6');
            var is4Col = el.classList.contains('col-md-3') || el.closest('.col-md-3');

            if (is3Col) {
                // 3 columns: Left, Bottom, Right
                if (sideIndex % 3 === 0) { xOffset = -distance * 1.5; yOffset = 20; }
                else if (sideIndex % 3 === 1) { xOffset = 0; yOffset = distance * 1.5; }
                else { xOffset = distance * 1.5; yOffset = 20; }
            } else if (is4Col) {
                // 4 columns: Left, Bottom, Bottom, Right
                if (sideIndex % 4 === 0) { xOffset = -distance * 1.5; yOffset = 20; }
                else if (sideIndex % 4 === 1 || sideIndex % 4 === 2) { xOffset = 0; yOffset = distance * 1.5; }
                else { xOffset = distance * 1.5; yOffset = 20; }
            } else {
                // Default to 2 columns or anything else: Left, Right
                if (sideIndex % 2 === 0) { xOffset = -distance * 1.5; yOffset = 20; }
                else { xOffset = distance * 1.5; yOffset = 20; }
            }
            
            return { x: xOffset, y: yOffset };
        }

        switch (effect) {
            case 'fadeInLeft':
                return { x: -distance, y: 15 };
            case 'fadeInRight':
                return { x: distance, y: 15 };
            case 'fadeInTop':
            case 'fadeInDown':
                return { x: 0, y: -distance };
            case 'fadeInBottom':
            case 'fadeInUp':
                return { x: 0, y: distance };
            default:
                return { x: 0, y: 35 };
        }
    };

    var animateCssClassFor = function(effect) {
        return effect === 'fadeInLeft' ? 'fadeInLeft' :
               effect === 'fadeInRight' ? 'fadeInRight' :
               effect === 'fadeInTop' || effect === 'fadeInDown' ? 'fadeInDown' :
               effect === 'fadeInBottom' || effect === 'fadeInUp' ? 'fadeInUp' :
               'fadeIn';
    };

    var revealWithFallback = function(el, delay) {
        var effect = el.getAttribute('data-animate-effect') || 'fadeIn';
        var cls = animateCssClassFor(effect);

        setTimeout(function() {
            el.classList.add(cls, 'animated');
        }, delay || 0);
    };

    /* ---- GSAP Scroll-triggered animations ---- */
    var contentScrollTrigger = function() {
        var boxes = document.querySelectorAll('.animate-box');

        if (!boxes.length) return;

        if (prefersReducedMotion()) {
            boxes.forEach(function(el) {
                el.classList.add('animated');
            });
            return;
        }

        if (!registerGsapPlugins() || typeof ScrollTrigger === 'undefined') {
            boxes.forEach(function(el, index) {
                revealWithFallback(el, index * 70);
            });
            return;
        }

        ScrollTrigger.batch('.animate-box', {
            interval: 0.15,
            batchMax: 6,
            start: "top 88%",
            once: true,
            onEnter: function(batch) {
                batch.forEach(function(el, index) {
                    if (el.classList.contains('animated') || el.classList.contains('animating')) return;

                    var fromVars = revealVarsFor(el.getAttribute('data-animate-effect') || 'fadeIn', el);
                    var delay = Math.min(index * 0.2, 1.0);

                    el.classList.add('animating');

                    gsap.fromTo(el,
                        {
                            autoAlpha: 0,
                            x: fromVars.x,
                            y: fromVars.y,
                            filter: 'blur(8px)'
                        },
                        {
                            autoAlpha: 1,
                            x: 0,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 1.2,
                            delay: delay,
                            ease: 'power4.out',
                            clearProps: 'all',
                            onComplete: function() {
                                el.classList.remove('animating');
                                el.classList.add('animated');
                            }
                        }
                    );
                });
            }
        });
    };

    var initProfessionalReveals = function() {
        if (prefersReducedMotion() || !registerGsapPlugins() || typeof ScrollTrigger === 'undefined') return;

        var revealGroup = function(selector, options) {
            var elements = gsap.utils.toArray(selector);
            if (!elements.length) return;

            options = options || {};
            gsap.fromTo(elements,
                {
                    autoAlpha: 0,
                    x: options.x || 0,
                    y: options.y || 60,
                    scale: options.scale || 0.95,
                    filter: options.filter || 'blur(10px)'
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: options.duration || 0.72,
                    stagger: options.stagger || 0.08,
                    ease: options.ease || 'power3.out',
                    clearProps: 'transform,filter,visibility',
                    scrollTrigger: {
                        trigger: options.trigger || elements[0],
                        start: options.start || 'top 86%',
                        once: true
                    }
                }
            );
        };

        revealGroup('.colorlib-experience .heading-meta, .colorlib-experience .colorlib-heading', {
            trigger: '.colorlib-experience',
            y: 26,
            stagger: 0.06
        });

        gsap.utils.toArray('.timeline-entry:not(.begin)').forEach(function(entry, index) {
            gsap.fromTo(entry,
                {
                    autoAlpha: 0,
                    x: index % 2 === 0 ? -120 : 120,
                    y: 50,
                    filter: 'blur(12px)'
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.1,
                    ease: 'power3.out',
                    clearProps: 'all',
                    scrollTrigger: {
                        trigger: entry,
                        start: 'top 88%',
                        once: true
                    }
                }
            );
        });

        revealGroup('.fancy-collapse-panel .panel', {
            trigger: '.colorlib-education',
            y: 60,
            stagger: 0.12
        });

        revealGroup('.colorlib-work .heading-meta, .colorlib-work .colorlib-heading, .work-menu', {
            trigger: '.colorlib-work',
            y: 40,
            stagger: 0.1
        });

        revealGroup('.contact-info-card', {
            trigger: '.contact-info-col',
            x: -80,
            y: 40,
            stagger: 0.12,
            filter: 'blur(10px)'
        });

        revealGroup('.contact-form-card', {
            trigger: '.contact-form-col',
            x: 80,
            y: 40,
            duration: 1.2,
            filter: 'blur(10px)'
        });

        revealGroup('.cp-card', {
            trigger: '.contact-profiles',
            y: 26,
            scale: 0.97,
            stagger: 0.07
        });

        gsap.utils.toArray('.skill-card').forEach(function(card) {
            var tags = card.querySelectorAll('.skill-tag');
            if (!tags.length) return;

            gsap.fromTo(tags,
                { autoAlpha: 0, y: 14, scale: 0.96 },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 84%',
                        once: true
                    }
                }
            );
        });
    };

    var initSplitText = function() {
        if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
            var splits = new SplitType('.split-text', { types: 'chars' });
            
            $('.split-text').each(function() {
                var el = this;
                var chars = $(el).find('.char');
                gsap.fromTo(chars, 
                    { y: '115%' },
                    {
                        y: '0%',
                        duration: 0.6,
                        stagger: 0.02,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            once: true
                        }
                    }
                );
            });
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
            // Interactive Network Graph setup using particles.js
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 120, "density": { "enable": true, "value_area": 1000 } },
                    "color": { "value": ["#6366f1", "#ec4899", "#10b981", "#8b5cf6"] },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 1.5, "size_min": 0.1, "sync": false } },
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
            
            // Generate neurons in random places on click
            $('#particles-js').on('click', function() {
                if (window.pJSDom && window.pJSDom.length > 0) {
                    var pjs = window.pJSDom[0].pJS;
                    var numParticles = 5;
                    for(var i=0; i<numParticles; i++) {
                        var randX = Math.random() * pjs.canvas.w;
                        var randY = Math.random() * pjs.canvas.h;
                        pjs.fn.modes.pushParticles(1, {pos_x: randX, pos_y: randY});
                    }
                }
            });
            
            // Adjust dark theme reactivity for the network graph lines via CSS
            var networkObserver = new MutationObserver(function() {
                var isDark = document.body.getAttribute('data-theme') === 'dark';
                var canvasLines = document.querySelector('.particles-js-canvas-el');
                if(canvasLines) {
                    canvasLines.style.filter = isDark ? 'brightness(1.5) contrast(1.2)' : 'none';
                }
            });
            networkObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
        }
    };

    var initDataPipeline = function() {
        if ($('#pipeline-path').length && typeof gsap !== 'undefined') {
            var path = document.querySelector('#pipeline-path');
            var pathLength = path.getTotalLength();
            
            // Set initial dash offset
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;
            
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
        $(window).on('scroll', function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            $('#scroll-progress').css('width', scrolled + '%');
        });
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
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            cursorFollower.style.left = followerX + "px";
            cursorFollower.style.top = followerY + "px";
            
            requestAnimationFrame(loop);
        }
        loop();

        // Hover states on links and buttons
        var interactables = document.querySelectorAll('a, button, input, textarea, select, .project');
        interactables.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hovered');
                cursorFollower.classList.add('hovered');
            });
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hovered');
                cursorFollower.classList.remove('hovered');
            });
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

    /* ---- Init ---- */
    
    var initDynamicMorphing = function() {
        if (typeof gsap === 'undefined') return;
        var overlay = document.querySelector(".shape-overlays");
        var paths = document.querySelectorAll(".shape-overlays__path");
        if (!overlay || paths.length === 0) return;
        
        var numPoints = 10;
        var numPaths = paths.length;
        var delayPointsMax = 0.3;
        var delayPerPath = 0.25;
        var duration = 0.9;
        var isOpened = false;
        var pointsDelay = [];
        var allPoints = [];
        
        var tl = gsap.timeline({ onUpdate: render, defaults: { ease: "power2.inOut", duration: 0.9 }});
        
        for (var i = 0; i < numPaths; i++) {
            var points = [];
            allPoints.push(points);
            for (var j = 0; j < numPoints; j++) {
                points.push(100);
            }
        }
        
        function render() {
            if (!overlay.classList.contains("is-opened") && !tl.isActive()) return;
            for (var i = 0; i < numPaths; i++) {
                var path = paths[i];
                var points = allPoints[i];
                var d = "";
                d += isOpened ? "M 0 0 V " + points[0] + " C" : "M 0 " + points[0] + " C";
                for (var j = 0; j < numPoints - 1; j++) {
                    var p = (j + 1) / (numPoints - 1) * 100;
                    var cp = p - (1 / (numPoints - 1) * 100) / 2;
                    d += " " + cp + " " + points[j] + " " + cp + " " + points[j+1] + " " + p + " " + points[j+1];
                }
                d += isOpened ? " V 100 H 0" : " V 0 H 0";
                path.setAttribute("d", d);
            }
        }
        
        function toggle() {
            tl.progress(0).clear();
            for (var i = 0; i < numPoints; i++) {
                pointsDelay[i] = Math.random() * delayPointsMax;
            }
            for (var i = 0; i < numPaths; i++) {
                var points = allPoints[i];
                var pathDelay = delayPerPath * (isOpened ? i : (numPaths - i - 1));
                for (var j = 0; j < numPoints; j++) {
                    var delay = pointsDelay[j];
                    tl.to(points, {
                        [j]: 0
                    }, delay + pathDelay);
                }
            }
        }
        
        // Trigger morphing when user clicks main nav links
        $('.colorlib-nav-toggle, #colorlib-main-menu ul li a').on('click', function() {
            if (!tl.isActive()) {
                isOpened = true;
                overlay.classList.add("is-opened");
                toggle();
                setTimeout(function() {
                    isOpened = false;
                    toggle();
                    setTimeout(function() {
                        overlay.classList.remove("is-opened");
                    }, duration * 1000 + (numPaths * delayPerPath * 1000));
                }, 900);
            }
        });
    };

    var initRandomness = function() {
        if (typeof gsap === 'undefined') return;
        var colors = ["#0ae448", "#fec5fb", "#ff8709", "#9d95ff", "#abff84", "#00bae2", "#6366f1", "#a855f7"];
        var boxes = document.querySelectorAll(".random-box");
        if (boxes.length === 0) return;
        
        boxes.forEach(function(box) {
            gsap.to(box, {
                x: function() { return gsap.utils.random(-800, 800, 5) },
                y: function() { return gsap.utils.random(-400, 400, 5) },
                backgroundColor: function() { return gsap.utils.random(colors) },
                scale: function() { return gsap.utils.random(0.5, 2.5) },
                rotation: function() { return gsap.utils.random(0, 360) },
                repeat: -1,
                repeatRefresh: true,
                duration: function() { return gsap.utils.random(3, 8) },
                repeatDelay: function() { return gsap.utils.random(0.1, 0.5) },
                ease: "sine.inOut"
            });
        });
    };

    var initThemeToggle = function() {
        var themeToggleBtn = document.getElementById('theme-toggle');
        var icon = themeToggleBtn.querySelector('i');
        
        // Check for saved theme
        var currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            icon.className = 'icon-sun';
        }

        themeToggleBtn.addEventListener('click', function() {
            var isDark = document.body.getAttribute('data-theme') === 'dark';
            var newTheme = isDark ? 'light' : 'dark';
            
            // Native smooth color transition using background mesh is already handled by CSS
            document.body.setAttribute('data-theme', newTheme);
            icon.className = isDark ? 'icon-moon' : 'icon-sun';
            
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

        var skillCards = document.querySelectorAll('.skill-card');
        var hideTimeout = null;

        skillCards.forEach(function(card) {
            card.addEventListener('mouseenter', function(e) {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }

                // If recently hidden or hidden, snap it to the position instantly to avoid flying across screen
                if (mag.style.display !== 'block' || mag.style.opacity === '0') {
                    if (typeof gsap !== 'undefined') {
                        gsap.set(mag, { left: e.clientX, top: e.clientY });
                    } else {
                        mag.style.left = e.clientX + 'px';
                        mag.style.top  = e.clientY + 'px';
                    }
                }

                mag.style.display = 'block';
                // Force reflow
                void mag.offsetWidth;
                mag.style.opacity = '1';

                // Hide custom cursor elements if they exist
                var c = document.getElementById('cursor');
                if (c) c.style.opacity = '0';
                var f = document.getElementById('cursor-follower');
                if (f) f.style.opacity = '0';
            });

            card.addEventListener('mousemove', function(e) {
                // Smooth GSAP follow if available, otherwise instant JS update
                if (typeof gsap !== 'undefined') {
                    gsap.to(mag, {
                        left: e.clientX,
                        top: e.clientY,
                        duration: 0.15,
                        ease: "power2.out"
                    });
                } else {
                    mag.style.left = e.clientX + 'px';
                    mag.style.top  = e.clientY + 'px';
                }
            });

            card.addEventListener('mouseleave', function() {
                mag.style.opacity = '0';
                hideTimeout = setTimeout(function() {
                    mag.style.display = 'none';
                }, 250);

                var c = document.getElementById('cursor');
                if (c) c.style.opacity = '1';
                var f = document.getElementById('cursor-follower');
                if (f) f.style.opacity = '1';
            });
        });
    };

    $(function(){

        initPreloader();
        fullHeight();
        
        contentScrollTrigger();
        
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
        if (typeof Flip === 'undefined' || typeof gsap === 'undefined') return;
        gsap.registerPlugin(Flip);
        
        const filters = document.querySelectorAll('.work-menu a');
        const projects = document.querySelectorAll('.project-item');
        
        filters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active class
                filters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Get current state
                const state = Flip.getState(projects);
                
                // Update DOM (toggle hidden class)
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        project.classList.remove('hidden');
                    } else {
                        project.classList.add('hidden');
                    }
                });
                
                // Animate from previous state to new state
                Flip.from(state, {
                    duration: 0.6,
                    ease: "power2.inOut",
                    absolute: true,
                    scale: true,
                    onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }),
                    onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 })
                });
                
                // Refresh ScrollTrigger after layout shift
                setTimeout(() => { ScrollTrigger.refresh(); }, 650);
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

    var initDataFlow = function() {
        if (typeof gsap === 'undefined' || typeof MotionPathPlugin === 'undefined') return;
        
        const packets = document.querySelectorAll('.data-packet');
        const path = document.querySelector('#pipeline-path');
        
        if (!path || packets.length === 0) return;
        
        packets.forEach((packet, index) => {
            gsap.to(packet, {
                duration: 4 + (index * 2),
                repeat: -1,
                ease: "none",
                motionPath: {
                    path: path,
                    align: path,
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                },
                delay: index * 1.5
            });
        });
    };

    var initProjectGridReveal = function() {
        // Disabled: Managed centrally by contentScrollTrigger via .animate-box to avoid double-animation overlap
        return;
    };

    var initProjectTilt = function() {
        if (typeof gsap === 'undefined') return;
        
        $('.project-item').on('mousemove', function(e) {
            const project = $(this).find('.project');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(project, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000
            });
        }).on('mouseleave', function() {
            const project = $(this).find('.project');
            gsap.to(project, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    };

    var initSkillProgress = function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        $('.skill-progress-bar').each(function() {
            var el = this;
            var progress = $(el).data('progress');
            
            gsap.to(el, {
                width: progress + '%',
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    once: true
                }
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
            initDataPipeline();
            initSkillSphere();
            initProjectModals();
            initScrubText();
            
            // New GSAP Features
            initParallax();
            // initHoverReveal();
            initProjectFilterFlip();
            initMorphingBlob();
            initTextScramble();
            initDataFlow();
            initProfessionalReveals();
            
            // Premium Added Features
            initProjectGridReveal();
            initProjectTilt();
            initSkillProgress();
            initSkillMagnifier();
            
            // GSAP Dynamic Examples
            initDynamicMorphing();
            initRandomness();
            
            // AI Futuristic Animated Additions
            initThemeToggle();
            initSpotlightHover();
            initScrollSVG();

        }, 100);
    });

}());

