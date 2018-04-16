$(function() {
	$('#swiper').swiper({
		pagination: '.swiper-pagination',
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		paginationClickable: true
	});
	$('#swiper01').swiper({
		pagination: '.swiper-pagination',
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		paginationClickable: true
	});
	

	//滚动显示
	$(window).scroll(function() {
		//滚动显示返回顶部按钮
		if($("#gotop").offset().top > 800) {
			$("#gotop").css("opacity", 1);
		} else {
			$("#gotop").css("opacity", 0);
		}
		//顶部导航显示
		var top = $("#top_nav").offset().top/400;
		if(top<=1){
			$("#top_nav").css("opacity", top);
		}else{
			$("#top_nav").css("opacity", 1);
		}
	})
	
	//数量加减
	var numCount;
	$(".add").click(function () {
		numCount=parseInt($(this).siblings(".count_num").val());
		numCount++;
		$(this).siblings(".count_num").val(numCount);
	})
	$(".reduce").click(function () {
		numCount=parseInt($(this).siblings(".count_num").val());
		if(numCount>1){
			numCount--;
		}else{
			numCount=1;
		}	
		$(this).siblings(".count_num").val(numCount);
	})

})