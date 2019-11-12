$(document).ready(function(){
		$('.carousel__inner').slick({
			speed: 1200,
			// adaptiveHeight: true,
			prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left.png"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right.png"></button>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						arrows: false,
						dots: false,
						autoplay: true,
						autoplaySpeed: 2000
						
					}
				}
			]
		});
		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
				.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

		$('.catalog-item__link').each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});

		$('.catalog-item__back').each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	
		$('[data-modal=consultation]').on('click', function() {
				$('.overlay, #consultation').fadeIn();
		});
		$('.modal__close').on('click', function() {
			$('.overlay, #consultation, #thank, #order').fadeOut();
		});
	 
	 $('.button_mini').each(function(i) {
		 $(this).on('click', function(){
			 $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			 $('.overlay, #order').fadeIn();
		 })
	 });
	 
	 function valideForms(form){
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});     
	 };

	 valideForms('#consultation-form');
	 valideForms('#consultation form');
	 valideForms('#order form');

	 $('input[name=phone]').mask("+375 (99) 999-99-99");
	 
	 $('form').submit(function(e) {
		 e.preventDefault();
		 $.ajax({
			 type:"POST",
			 url: "mailer/smart.php",
			 data: $(this).serialize()
		 }).done(function() {
			 $(this).find("input").val("");
			 $('#consultation, #order').fadeOut();
			 $('.overlay, #thanks').fadeIn();
			 $('form').trigger('reset');
		 });
		 return false;
	 });

	 $(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
				$('.pageup').fadeIn();
		} else {
				$('.pageup').fadeOut();
		}
});

	 $("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	new WOW().init();
});