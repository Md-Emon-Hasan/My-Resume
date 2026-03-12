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

    /* ---- Counter ---- */
    var counter = function() {
        $('.js-counter').countTo({
            formatter: function(value, options) {
                return value.toFixed(options.decimals);
            }
        });
    };

    var counterWayPoint = function() {
        if ($('#colorlib-counter').length > 0) {
            $('#colorlib-counter').waypoint(function(direction) {
                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    setTimeout(counter, 400);
                    $(this.element).addClass('animated');
                }
            }, { offset: '90%' });
        }
    };

    /* ---- Scroll-triggered animations ---- */
    var applyEffect = function(el) {
        var effect = el.data('animate-effect') || 'fadeIn';
        var cls = effect === 'fadeInLeft'  ? 'fadeInLeft'  :
                  effect === 'fadeInRight' ? 'fadeInRight' :
                  effect === 'fadeInTop'   ? 'fadeInUp'    : 'fadeIn';
        el.addClass(cls + ' animated');
    };

    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            applyEffect(el);
                            el.removeClass('item-animate');
                        }, k * 200);
                    });
                }, 100);
            }
        }, { offset: '85%' });
    };

    /* ---- Animate elements already in viewport on load ---- */
    var checkOnLoad = function() {
        var vpBottom = $(window).scrollTop() + $(window).height();
        $('.animate-box').each(function() {
            if ($(this).offset().top < vpBottom) {
                applyEffect($(this));
            }
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

    /* ---- Click menu (Lenis handles the actual scroll — we just set active state) ---- */
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

    /* ---- Init ---- */
    $(function() {
        fullHeight();
        counter();
        counterWayPoint();
        contentWayPoint();
        burgerMenu();
        clickMenu();
        navigationSection();
        mobileMenuOutsideClick();
        sliderMain();
        checkOnLoad();
    });

}());