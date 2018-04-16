$(function() {
	$('#swiper').swiper({
		pagination: '.swiper-pagination',
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		paginationClickable: true
	});
	$('#swiper01').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView:3,
		spaceBetween: 0
	});
	$('#swiper02').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView:3,
		spaceBetween: 0
	});
	$('#swiper03').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView:3,
		spaceBetween: 0
	});
	$('#swiper04').swiper({
		autoplay: 2000,
		autoplayDisableOnInteraction: false,
		slidesPerView:3,
		spaceBetween: 0
	});
	//滚动显示
	$(window).scroll(function() {
		//滚动显示顶部搜索框
		if($("#head_nav").offset().top > 470) {
			$("#head_nav").css("opacity", 1);
		}else{
			$("#head_nav").css("opacity", 0);
		}
		var search_top = $("#search").offset().top/400;
		if(search_top<=1){
			$("#search").css("background-color", 'rgba(0,0,0,' + search_top + ')');
		}else{
			$("#search").css("background-color", 'rgba(0,0,0,1)');
		}
		//滚动显示返回顶部按钮
		if($("#gotop").offset().top > 800){
			$("#gotop").css("opacity", 1);
		}else{
			$("#gotop").css("opacity", 0);
		}
	})

})