function checkPasswordMatch(fieldConfirmPassword) {
    if (fieldConfirmPassword.value !== $("#passwordC").val()) {
        fieldConfirmPassword.setCustomValidity("Пароли не совпадают!");
    } else {
        fieldConfirmPassword.setCustomValidity("");
    }
}

$(document).ready(function() {
    // $(function () {
    //     let hash = location.hash;
    //
    //     if (hash === '#login-tab-content'){
    //         $('#signup-tab-content').removeClass('active');
    //         $('#login-tab-content').addClass('active');
    //         $('.log-in').addClass('active');
    //         $('.sign-up').addClass('remove');
    //     } else  if (hash === '#signup-tab-content'){
    //         $('#login-tab-content').removeClass('active');
    //         $('#signup-tab-content').addClass('active');
    //         $('.sign-up').addClass('active');
    //         $('.log-in').addClass('remove');
    //     }
    // });

// LOGIN TABS
    $(function () {
        var tab = $('.tabs h3 a');
        tab.on('click', function (event) {
            debugger;
            // location.hash = this.hash;
            event.preventDefault();
            tab.removeClass('active');
            $(this).addClass('active');
            tab_content = $(this).attr('href');
            $('div[id$="tab-content"]').removeClass('active');
            $(tab_content).addClass('active');
        });
    });

    function checkPasswordMatch(fieldConfirmPassword) {
        if (fieldConfirmPassword.value !== $("#password").val()) {
            fieldConfirmPassword.setCustomValidity("Пароли не совпадают!");
        } else {
            fieldConfirmPassword.setCustomValidity("");
        }
    }

// SLIDESHOW
    $(function () {
        $('#slideshow > div:gt(0)').hide();
        setInterval(function () {
            $('#slideshow > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#slideshow');
        }, 3850);
    });

    // $(function () {
    //     $('#buttonOpen').on('click', function (e) {
    //         $('#login-form').attr('action', '/login').submit();
    //         return false;
    //     })
    // });

    // $(function () {
    //     $('#buttonReg').on('click', function (e) {
    //       location.hash = '#signup-tab-content'
    //     })
    // });

// CUSTOM JQUERY FUNCTION FOR SWAPPING CLASSES
    (function ($) {
        'use strict';
        $.fn.swapClass = function (remove, add) {
            this.removeClass(remove).addClass(add);
            return this;
        };
    }(jQuery));

// SHOW/HIDE PANEL ROUTINE (needs better methods)
// I'll optimize when time permits.
    $(function () {
        $('.agree,.forgot, #toggle-terms, .log-in, .sign-up').on('click', function (event) {
            event.preventDefault();
            var terms = $('.terms'),
                recovery = $('.recovery'),
                close = $('#toggle-terms'),
                arrow = $('.tabs-content .fa');
            if ($(this).hasClass('agree') || $(this).hasClass('log-in') || ($(this).is('#toggle-terms')) && terms.hasClass('open')) {
                if (terms.hasClass('open')) {
                    terms.swapClass('open', 'closed');
                    close.swapClass('open', 'closed');
                    arrow.swapClass('active', 'inactive');
                } else {
                    if ($(this).hasClass('log-in')) {
                        return;
                    }
                    terms.swapClass('closed', 'open').scrollTop(0);
                    close.swapClass('closed', 'open');
                    arrow.swapClass('inactive', 'active');
                }
            } else if ($(this).hasClass('forgot') || $(this).hasClass('sign-up') || $(this).is('#toggle-terms')) {
                if (recovery.hasClass('open')) {
                    recovery.swapClass('open', 'closed');
                    close.swapClass('open', 'closed');
                    arrow.swapClass('active', 'inactive');
                } else {
                    if ($(this).hasClass('sign-up')) {
                        return;
                    }
                    recovery.swapClass('closed', 'open');
                    close.swapClass('closed', 'open');
                    arrow.swapClass('inactive', 'active');
                }
            }
        });
    });

// DISPLAY MSSG
//     $(function () {
//         $('.recovery .button').on('click', function (event) {
//             event.preventDefault();
//             $('.recovery .mssg').addClass('animate');
//             setTimeout(function () {
//                 $('.recovery').swapClass('open', 'closed');
//                 $('#toggle-terms').swapClass('open', 'closed');
//                 $('.tabs-content .fa').swapClass('active', 'inactive');
//                 $('.recovery .mssg').removeClass('animate');
//             }, 2500);
//         });
//     });
});