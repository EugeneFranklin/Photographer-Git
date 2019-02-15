;(function(){
    $(function(){
        $('.show-hide').on('click', function () {
            var $this = $(this);
            $this.closest('.item').toggleClass('minimized');
        });

        var menu = $('header nav');
        $('.hamburger').on('click', function () {
            menu.toggleClass('visible');
            $(this).toggleClass('menu-opened');
        });

        $('.carousel').off('slide.bs.carousel').on('slide.bs.carousel', function(e) {
            var el = e.relatedTarget.firstElementChild;
            positionSlider(el);
        });

        $(window).on('resize', function(){
            var modal = $('.modal.show');
            modal.length && positionSlider($('.active img', modal).get(0));
        });

        $('#first_form').on('submit', function(e) {
            e.preventDefault();
            var first_name = $('#first_name').val();

            var email = $('#email').val();
            var tel = $('#tel').val();

            $(".error").remove();

            if (first_name === '') {
                $('#first_name').after('<span class="error">Это поле не заполнено</span>');
            }
            if (email === '') {
                $('#email').after('<span class="error">Это поле не заполнено</span>');
            } else {
                var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var validEmail = regEx.test(email);
                if (!validEmail) {
                    $('#email').after('<span class="error">Некорректный email</span>');
                }
            }
            if (tel === '') {
                $('#tel').after('<span class="error">Это поле не заполнено</span>');
            } else {
                var regEx = /\d{10}/;
                var validTel = regEx.test(tel);
                if (!validTel) {
                    $('#tel').after('<span class="error">Неверный номер</span>');
                }
            }
        });
    });
})();

function positionSlider(el) {
    var border = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var h = el.height;
    var w = el.width + 2 * border;

    if(w > $(window).width() * .8) {
        w = $(window).width() * .8 - 2 * border;
        h = h * ( w / el.width);
    }

    if(h > $(window).height() * .8) {
        h = $(window).height() * .8;
        w = w * ( h / el.height) + 2 * border;
    }

    $(el).parents('.carousel:first')
        .find('.carousel-inner')
        .finish()
        .animate({
            height: h
        }, 300)
        .end()
        .parents('.modal-dialog')
        .finish()
        .animate({
            width: w,
            maxWidth: w
        }, 300);
}

function openSlider(num) {
    var slider = $('#modalSlider' + num).modal();
    positionSlider($('.active img', slider).get(0));
}