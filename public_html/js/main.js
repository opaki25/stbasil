(function ($) {
    "use strict";

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    if (!prefersReducedMotion) {
        new WOW().init();
    }

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: !prefersReducedMotion,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // attractions carousel
    $(".blog-carousel").owlCarousel({
        autoplay: !prefersReducedMotion,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: !prefersReducedMotion,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Contact form mail handoff
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();

        var form = this;
        var $status = $('#contactFormStatus');
        var $fallback = $('#contactMailFallback');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var service = $('#service').val().trim();
        var subject = $('#subject').val().trim() || 'Website enquiry';
        var message = $('#message').val().trim();

        var body = [
            'Name: ' + name,
            'Email: ' + email,
            'Phone: ' + (phone || 'Not provided'),
            'Service Needed: ' + (service || 'Not specified'),
            '',
            'Message:',
            message
        ].join('\n');

        var recipient = 'stbasilpalliativehomecareltd@gmail.com';
        var encodedSubject = encodeURIComponent(subject);
        var encodedBody = encodeURIComponent(body);
        var mailtoUrl = 'mailto:' + recipient + '?subject=' + encodedSubject + '&body=' + encodedBody;
        var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
            encodeURIComponent(recipient) + '&su=' + encodedSubject + '&body=' + encodedBody;

        $fallback.attr('href', mailtoUrl).removeClass('d-none');
        $status
            .removeClass('text-danger')
            .addClass('text-success')
            .text('Opening Gmail with your message. Please review it and press Send.');

        var composeWindow = window.open(gmailUrl, '_blank');
        if (!composeWindow) {
            window.location.href = mailtoUrl;
            $status
                .removeClass('text-success')
                .addClass('text-danger')
                .text('Popup blocked. Use the email-app link below to send your message.');
        } else {
            composeWindow.opener = null;
        }
    });


})(jQuery);

