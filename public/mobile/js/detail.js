$(document).ready(function() {
	$th = 3;
	$th2 = 0;
	$kfav = 0;
	$(".detai_pic").click(function() {
		//		$(this).find("img").attr("src", "https://cres1.fenqile.cn/item_m/img/weex/keep_red--6e32216c27.png")
		if($kfav == 0) {
			$(this).find("img").attr("src", "https://cres1.fenqile.cn/item_m/img/weex/keep_red--6e32216c27.png")
			$kfav=1;
		}else{
			$(this).find("img").attr("src", "https://cres1.fenqile.cn/item_m/img/weex/keep_gray--4ae1935bfd.png")
			$kfav=0;
			
		}
	})
	$(".gotop").click(function() {})
	$(document).scroll(function() {
		$h = $(document).scrollTop();
		if($h >= 1816) {
			$('.scroll_panel ul').css("position", "fixed").css("top", "0").css("left", "0").css("z-index", "1012");
			$(".am-tabs-bd").css("margin-top", "82px");
		} else {
			$('.scroll_panel ul').css("position", "static");
			$(".am-tabs-bd").css("margin-top", "0");
		}
		if($h >= 1200) {
			$(".gotop").css("display", "block")
		} else {
			$(".gotop").css("display", "none")
		}

	})
	$(".am-tabs ul li").click(function() {
		$h = $(document).scrollTop();
		if($h >= 1816) {
			$(document).scrollTop(1816);
		}
	})
	$(".ziliao").click(function() {
		location.href = "ziliao.html";
	})
	$(".cuxiao").click(function() {
		$(".cover-detail").css("display", "block");
		$(".discount-message").animate({
			bottom: "0"
		}, 1000)
	})
	$(".ok-btn").click(function() {
		$(".discount-message").animate({
			bottom: "-60%"
		}, 1000, function() {
			$(".cover-detail").css("display", "none");
		})
	})
	$(".guige").click(function() {
		$(".cover-detail").css("display", "block");
		$(".good-kind").animate({
			bottom: "0"
		}, 1000)
	})
	$(".baozheng").click(function() {
		$(".cover-detail").css("display", "block");
		$(".det-des").animate({
			bottom: "0"
		}, 1000, function() {
			$(".ok-btn3").css("bottom", "0");
		});
	})
	$(".ok-btn2").click(function() {
		$(".good-kind").animate({
			bottom: "-90%"
		}, 1000, function() {
			$(".cover-detail").css("display", "none");
			$("#guige").text($('.colo-cha').eq($th).text() + " " + $('.colo-cha2').eq($th2).text() + " " + "全网通");
		})
	})
	$(".ok-btn3").click(function() {
		$(".ok-btn3").css("bottom", "-48px");

		$(".det-des").animate({
			bottom: "-60%"
		}, 1000, function() {
			$(".cover-detail").css("display", "none");
		})
		//		$(".ok-btn3").animate({
		//			bottom: "-48px"
		//		}, 1000)
	})
	$(".songz").click(function() {
		location.href = "myaddress.html";
	})
	$.each($('.colo-cha'), function(i) {
		$(this).click(function() {
			$('.colo-cha').removeClass("colo-ch");
			$(this).addClass("colo-ch");
			$th = i;
		})
	});
	$.each($('.colo-cha2'), function(i) {
		$(this).click(function() {
			$('.colo-cha2').removeClass("colo-ch");
			$(this).addClass("colo-ch");
			$th2 = i;
		})
	});
	//	$(".cover-detail").click(function() {
	//		$(".discount-message").animate({
	//			bottom: "-60%"
	//		}, 1000, function() {
	//			$(".cover-detail").css("display", "none");
	//		})
	//		$(".good-kind").animate({
	//			bottom: "-90%"
	//		}, 1000, function() {
	//			$(".cover-detail").css("display", "none");
	//		})
	//		$(".det-des").animate({
	//			bottom: "-70%"
	//		}, 1000, function() {
	//			$(".cover-detail").css("display", "none");
	//		})
	//	})
	$(".gobuy").click(function() {
		location.href = "order-buy.html";
	})
})