$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

    var newLives = $('.new-lives').lightSlider({
        item:3,
        slideMargin: 0,
        controls: false,
        loop:true,
        slideMove:3,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed:600,
        pager: false,
        responsive : [
            {
                breakpoint:800,
                settings: {
                    item:2,
                    slideMove:2
                }
            },
            {
                breakpoint:480,
                settings: {
                    item:1,
                    slideMove:1
                }
            }
        ]
    });

    $(".new-lives__arrow_left").on("click",function (e) {
        e.preventDefault();
        newLives.goToPrevSlide();
    });

    $(".new-lives__arrow_right").on("click",function (e) {
        e.preventDefault();
        newLives.goToNextSlide();
    });

    $(".hamburger").on("click",function(e){
        $(".menu").removeClass("hide");
    });
    $(".close").on("click",function(e){
        $(".menu").addClass("hide");
    });

    $(".hamburger2").on("click",function(e){
        $(".menu2").removeClass("hide2");
    });
    $(".close2").on("click",function(e){
        $(".menu2").addClass("hide2");
    });

    $('.a-time-line').on('click',function(){
        $(this).toggleClass('active');
        $(".time-line").toggleClass('active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".time-line,.a-time-line").length )return;
        $('.a-time-line').removeClass('active');
        $(".time-line").removeClass('active');
        event.stopPropagation();
    });

    $('.gamb').on('click',function(){
        $(this).toggleClass('active');
        $(".bot-mnu ul").toggleClass('active');
    });
    $(document).on("click",function(event){
        if( $(event.target).closest(".bot-mnu ul,.gamb").length )return;
        $('.gamb').removeClass('active');
        $(".bot-mnu ul").removeClass('active');
        event.stopPropagation();
    });



    $(".header3__timer")
        .countdown("2017/06/01", function(event) {
            $(this).find(".days").text(event.strftime('%D'));
            $(this).find(".hours").text(event.strftime('%H'));
            $(this).find(".minutes").text(event.strftime('%M'));
        });

});

//Форма отправки 2.0
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();

        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input, textarea');
        var send_btn = btn.closest('form').find('[name=send]');
        var subject = btn.closest('form').find('[name=form_subject]');
        $(ref).each(function () {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if (!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ($(this).attr("type") == 'tel') {
                    if (!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if (!(error == 1)) {
            $(send_btn).each(function () {
                $(this).attr('disabled', true);
            });

            var form = btn.closest('form'), name = form.find('[name=name]').val();

            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: msg,
                success: function (data) {
                    $.magnificPopup.close();
                    form[0].reset();
                    $(send_btn).each(function () {
                        $(this).attr('disabled', false);
                    });

                    if(subject == "Заказать звонок"){
                        $("a[href='#popupthx']").click();
                    }else{
                        $("a[href='#block-popup']").click();
                    }


                },
                error: function (xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }
        return false;
    });
});