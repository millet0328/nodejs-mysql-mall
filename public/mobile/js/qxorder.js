$(document).ready(function () {
	$(".tips-close").click(function () {
		$(".news-box").css("display","none");
	})
	$.each($(".reason_con"), function(i) {
		$(this).click(function () {
			$(".reason_con").removeClass("color_ac");
			$(this).addClass("color_ac")
		})
	});
	$(".btnb2").click(function () {
		$(".qx_succ").css("display","block");
		$(".qx_succ").animate({
			opacity:0
		},1000,function () {
			$(".qx_succ").css("display","none");
			$(".qx_succ").css("opacity","1");
			location.href="order.html";
		})
	})
})
