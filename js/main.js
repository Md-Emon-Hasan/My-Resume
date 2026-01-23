/**
 * Portfolio Main JavaScript
 * Author: Md. Hasan Imon
 */

;(function () {
    'use strict';

    /* ========================================
       MOBILE DETECTION
       ======================================== */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    /* ========================================
       FULL HEIGHT FUNCTION
       ======================================== */
    var fullHeight = function() {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function(){
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };

    /* ========================================
       COUNTER FUNCTION
       ======================================== */
    var counter = function() {
        $('.js-counter').countTo({
            formatter: function (value, options) {
                return value.toFixed(options.decimals);
            },
        });
    };

    /* ========================================
       COUNTER WAYPOINT
       ======================================== */
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

    /* ========================================
       SCROLL ANIMATIONS - CONTENT WAYPOINT
       ======================================== */
    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function(){
                    $('body .animate-box.item-animate').each(function(k){
                        var el = $(this);
                        setTimeout(function() {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, { offset: '85%' });
    };

    /* ========================================
       BURGER MENU (Mobile Menu Toggle)
       ======================================== */
    // var burgerMenu = function() {
    //     $('.js-colorlib-nav-toggle').on('click', function(event){
    //         event.preventDefault();
    //         var $this = $(this);

    //         if ($('body').hasClass('offcanvas')) {
    //             $this.removeClass('active');
    //             $('body').removeClass('offcanvas'); 
    //         } else {
    //             $this.addClass('active');
    //             $('body').addClass('offcanvas');    
    //         }
    //     });
    // };

    var burgerMenu = function() {
        $('.js-colorlib-nav-toggle').on('click', function(event){
            event.preventDefault();
            var $this = $(this);

            if ($('body').hasClass('offcanvas')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvas');
                $('body').css('overflow', 'auto'); // Body scroll enable
            } else {
                $this.addClass('active');
                $('body').addClass('offcanvas');
                $('body').css('overflow', 'hidden'); // Body scroll disable
            }
        });
    };

    /* ========================================
       CLICK OUTSIDE OF OFFCANVAS
       ======================================== */
    // var mobileMenuOutsideClick = function() {
    //     $(document).click(function (e) {
    //         var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
    //         if (!container.is(e.target) && container.has(e.target).length === 0) {
    //             if ($('body').hasClass('offcanvas')) {
    //                 $('body').removeClass('offcanvas');
    //                 $('.js-colorlib-nav-toggle').removeClass('active');
    //             }
    //         }
    //     });

    //     $(window).scroll(function(){
    //         if ($('body').hasClass('offcanvas')) {
    //             $('body').removeClass('offcanvas');
    //             $('.js-colorlib-nav-toggle').removeClass('active');
    //         }
    //     });
    // };

    var mobileMenuOutsideClick = function() {
        $(document).click(function (e) {
            var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas')) {
                    $('body').removeClass('offcanvas');
                    $('.js-colorlib-nav-toggle').removeClass('active');
                    $('body').css('overflow', 'auto'); // Body scroll enable
                }
            }
        });

        // Scroll function remove করে দাও - এটা আর লাগবে না
    };

    /* ========================================
       ANIMATE SECTION ON DEMAND (FOR CLICKS)
       ======================================== */
    var isClicking = false;

    var animateSectionOnDemand = function(targetSection) {
        var section = $('[data-section="' + targetSection + '"]');
        if (section.length) {
            // Re-initialize elements for animation
            section.find('.animate-box.animated').removeClass('animated');
            section.find('.animate-box.item-animate').removeClass('item-animate');
            section.find('.animate-box').each(function(k) {
                var el = $(this);
                setTimeout(function() {
                    var effect = el.data('animate-effect');
                    if (effect === 'fadeIn') {
                        el.addClass('fadeIn animated');
                    } else if (effect === 'fadeInLeft') {
                        el.addClass('fadeInLeft animated');
                    } else if (effect === 'fadeInRight') {
                        el.addClass('fadeInRight animated');
                    } else {
                        el.addClass('fadeInUp animated');
                    }
                }, k * 200);
            });
        }
    };

    /* ========================================
       CLICK MENU (Navigation)
       ======================================== */
    // var clickMenu = function() {
    //     $('#navbar a:not([class="external"])').click(function(event){
    //         var section = $(this).data('nav-section'),
    //             navbar = $('#navbar');
            
    //         if ($('[data-section="' + section + '"]').length) {
    //             isClicking = true;
                
    //             // Remove existing animation classes from all elements in the target section
    //             var targetElements = $('[data-section="' + section + '"]').find('.animate-box');
    //             targetElements.each(function() {
    //                 $(this).removeClass('animated fadeIn fadeInRight fadeInLeft fadeInUp');
    //             });
                
    //             $('html, body').animate({
    //                 scrollTop: $('[data-section="' + section + '"]').offset().top - 55
    //             }, 500, 'easeInOutExpo', function() {
    //                 animateSectionOnDemand(section);
    //                 // Update active nav link after animation
    //                 navActive(section);
    //                 isClicking = false;
    //             });
    //         }

    //         if (navbar.is(':visible')) {
    //             navbar.removeClass('in');
    //             navbar.attr('aria-expanded', 'false');
    //             $('.js-colorlib-nav-toggle').removeClass('active');
    //         }

    //         event.preventDefault();
    //         return false;
    //     });
    // };

    var clickMenu = function() {
        $('#navbar a:not([class="external"])').click(function(event){
            var section = $(this).data('nav-section'),
                navbar = $('#navbar');
            
            if ($('[data-section="' + section + '"]').length) {
                isClicking = true;
                
                // Remove existing animation classes from all elements in the target section
                var targetElements = $('[data-section="' + section + '"]').find('.animate-box');
                targetElements.each(function() {
                    $(this).removeClass('animated fadeIn fadeInRight fadeInLeft fadeInUp');
                });
                
                $('html, body').animate({
                    scrollTop: $('[data-section="' + section + '"]').offset().top - 55
                }, 500, 'easeInOutExpo', function() {
                    animateSectionOnDemand(section);
                    // Update active nav link after animation
                    navActive(section);
                    isClicking = false;
                });
            }

            // Close mobile menu if open
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
                $('body').css('overflow', 'auto');
            }

            if (navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
            }

            event.preventDefault();
            return false;
        });
    };

    /* ========================================
       NAVIGATION ACTIVE STATE
       ======================================== */
    var navActive = function(section) {
        if (isClicking) return;
        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function(){
            $(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
        });
    };

    /* ========================================
       NAVIGATION SECTION (Scroll Detection)
       ======================================== */
    var navigationSection = function() {
        var $section = $('section[data-section]');
        
        $section.waypoint(function(direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() { 
                return -$(this.element).height() + 155; 
            }
        });
    };

    /* ========================================
       CHECK ON LOAD (Animate visible sections)
       ======================================== */
    var checkOnLoad = function() {
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        $('.animate-box').each(function() {
            var el = $(this);
            var elTop = el.offset().top;

            // Animate if the element is above or within the viewport
            if (elTop < viewportBottom) {
                var effect = el.data('animate-effect');
                if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated');
                } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated');
                } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated');
                } else {
                    el.addClass('fadeInUp animated');
                }
            }
        });
    };

    /* ========================================
       SLIDER MAIN (Hero Section)
       ======================================== */
    var sliderMain = function() {
        $('#colorlib-hero .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function(){
                setTimeout(function(){
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function(){
                setTimeout(function(){
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
        });
    };

    /* ========================================
       STICKY FUNCTION (Not used in current layout but kept for future)
       ======================================== */
    var stickyFunction = function() {
        var h = $('.image-content').outerHeight();
        if ($(window).width() <= 992) {
            $("#sticky_item").trigger("sticky_kit:detach");
        } else {
            $('.sticky-parent').removeClass('stick-detach');
            $("#sticky_item").trigger("sticky_kit:detach");
            $("#sticky_item").trigger("sticky_kit:unstick");
        }
        $(window).resize(function(){
            var h = $('.image-content').outerHeight();
            $('.sticky-parent').css('height', h);
            if ($(window).width() <= 992) {
                $("#sticky_item").trigger("sticky_kit:detach");
            } else {
                $('.sticky-parent').removeClass('stick-detach');
                $("#sticky_item").trigger("sticky_kit:detach");
                $("#sticky_item").trigger("sticky_kit:unstick");
                $("#sticky_item").stick_in_parent();
            }
        });
        $('.sticky-parent').css('height', h);
        $("#sticky_item").stick_in_parent();
    };

    /* ========================================
       OWL CAROUSEL (Not used in current layout but kept for future)
       ======================================== */
    var owlCrouselFeatureSlide = function() {
        $('.owl-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            loop: true,
            margin: 0,
            nav: true,
            dots: false,
            autoHeight: true,
            items: 1,
            navText: [
                "<i class='icon-arrow-left3 owl-direction'></i>",
                "<i class='icon-arrow-right3 owl-direction'></i>"
            ]
        });
    };

    /* ========================================
       DOCUMENT READY - INITIALIZE ALL FUNCTIONS
       ======================================== */
    $(function(){
        fullHeight();
        counter();
        counterWayPoint();
        contentWayPoint();
        burgerMenu();
        clickMenu();
        navigationSection();
        mobileMenuOutsideClick();
        sliderMain();
        stickyFunction();
        owlCrouselFeatureSlide();
        checkOnLoad();
    });

}());