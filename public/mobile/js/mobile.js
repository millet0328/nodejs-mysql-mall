$(function() {
	$('#swiper').swiper({
		autoplay: null,
		slidesPerView: 6,
		spaceBetween: 12
	});
	$('#swiper01').swiper({
		pagination: '.swiper-pagination',
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		paginationClickable: true
	});
	$('#swiper02').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 3,
		spaceBetween: 0
	});
	$('#swiper03').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 3,
		spaceBetween: 0
	});
	$('#swiper04').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 3,
		spaceBetween: 0
	});
	$('#swiper05').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 3,
		spaceBetween: 0
	});

	//滚动显示
	$(window).scroll(function() {
		//滚动显示返回顶部按钮
		if($("#gotop").offset().top > 800) {
			$("#gotop").css("opacity", 1);
		} else {
			$("#gotop").css("opacity", 0);
		}
	})

	$("#swiper .swiper-slide").each(function() {
		$(this).click(function() {
			$("#swiper .swiper-slide").removeClass("active");
			$(this).addClass("active");
		})
	})

	//方向转换
	$(".direction").click(function() {
		if($(this).find("span").hasClass('am-icon-caret-down')) {
			$(this).find("span").removeClass("am-icon-caret-down");
			$(this).find("span").addClass("am-icon-caret-up");
		} else {
			$(this).find("span").removeClass("am-icon-caret-up");
			$(this).find("span").addClass("am-icon-caret-down");
		}
	})
	
	

})