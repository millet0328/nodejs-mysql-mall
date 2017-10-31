$(document).ready(function() {
	$th = [];
	$th2 = [];

	function summ() {
		for(var i = 0; i < $(".shop2").length; i++) {
			$th.push(0);
			$th2.push(0);
			//			$pri.push($(".shop2").find(".dera_price2").text());
		}
	}
	summ();
	//选择商品
	$(".shop2 .js-select").click(function() {
		if($(this)[0].classList.length < 3) {
			$(this).addClass("selected")
		} else {
			$(this).removeClass("selected")
		}
		isAllcheck();
	})
	//点击全选
	$(".shop .all-select").click(function() {
		if($(this)[0].classList.length < 3) {
			$(this).addClass("selected");
			$(this).parents(".top2").find(".js-select").addClass("selected");
		} else {
			$(this).removeClass("selected");
			$(this).parents(".top2").find(".js-select").removeClass("selected");
		}
		isAllcheck();
	})
	//点击总选
	$(".heji-select").click(function() {
		if($(this)[0].classList.length < 3) {
			$(this).addClass("selected")
			$(".i-select").addClass("selected");
		} else {
			$(this).removeClass("selected")
			$(".i-select").removeClass("selected");
		}
		isAllcheck();
	})
	//价格
	function sumprice() {
		$sum = 0;
		$(".js-select").each(function(i) {
			if($(this)[0].classList.length == 3) {
				$sum += parseInt($(this).parents(".shop2").find(".dera_price2")[0].innerText);
			}
		})
		$("#allprice").text($sum);
	}
	//判断是否全选
	$tt = 0;
	$tt2 = 0;

	function isAllcheck() {
		shopnu();
		$tt = 0;
		$tt2 = 0;
		$ttt = 0;
		$.each($(".js-select"), function(i) {
			if($(this)[0].classList.length == 3) {
				$tt2 = $tt2 + 1;
				$ttt = $ttt + parseInt($(this).parents(".shop2").find(".good-num").text());
			}
		});
		$(".gobuy").text("结算(" + $ttt + ")");
		$.each($(".shop"), function(i) {
			if($(this).parent(".top2").find(".shop2 .selected").length == $(this).parent(".top2").find(".js-select").length) {
				$(this).find(".all-select").addClass("selected");
				$tt = $tt + 1;
			} else {
				$(this).find(".all-select").removeClass("selected");
			}
		});
		console.log($tt + "pp" + $(".all-select").length)
		if($tt == $(".all-select").length && $tt != 0) {
			$(".heji-select").addClass("selected");
		} else if($tt == 0) {
			$(".heji-select").removeClass("selected");
		}
		sumprice();
		summ();
	}

	isAllcheck();

	$(".gobuy").click(function() {
		if($tt2 > 0) {
			location.href = "order-buy.html"
		}
	})
	//编辑
	var add_cut = [];
	var add_cut2 = 0;
	$(".allbj").click(function() {
		if(add_cut2 == 0) {
			$(".add-cut").css("display", "block").css("right", "8px");
			$(".shop_youhui").css("display", "none");
			$(".del_1").css("display", "none");
			$(this).text("完成");
			add_cut2 = 1;
			for(var i = 0; i < $(".bj").length; i++) {
				add_cut[i] = 0;
				$(".bj").text("编辑");
			}
		} else {
			$(".add-cut").css("display", "none").css("right", "69px");
			$(".shop_youhui").css("display", "block");
			add_cut2 = 0;
			$(this).text("编辑");
		}
	})
	$(".bj").each(function() {
		add_cut.push(0);
	})
	$.each($(".bj"), function(i) {
		$(this).click(function() {
			if(add_cut[i] == 0) {
				$(this).parents(".top2").find(".add-cut").css("display", "block");
				$(this).parents(".top2").find(".del_1").css("display", "block");
				add_cut[i] = 1;
				$(this).text("完成");
			} else {
				$(this).parents(".top2").find(".add-cut").css("display", "none");
				$(this).parents(".top2").find(".del_1").css("display", "none");
				add_cut[i] = 0;
				$(this).text("编辑");
			}
		})
	});
	//加减数量
	$.each($(".sub"), function(i) {
		$(this).click(function() {
			if(parseInt($(this).parents(".add-cut").find(".good-num").text()) != 1) {
				$(this).parents(".add-cut").find(".good-num").text(parseInt($(this).parents(".add-cut").find(".good-num").text()) - 1);
				$(this).parents(".shop2").find(".goo_num").text("x" + $(this).parents(".add-cut").find(".good-num").text());
				$(this).parents(".shop2").find(".dera_price2").text(parseInt($(this).parents(".shop2").find(".dera_price2").text()) / (parseInt($(this).parents(".add-cut").find(".good-num").text()) + 1) * parseInt($(this).parents(".add-cut").find(".good-num").text()));
				isAllcheck();
			}

		})
	})
	$.each($(".add"), function(i) {
		$(this).click(function() {
			//			if(parseInt($(this).parents(".add-cut").find(".good-num").text())!=1){
			$(this).parents(".add-cut").find(".good-num").text(parseInt($(this).parents(".add-cut").find(".good-num").text()) + 1);
			$(this).parents(".shop2").find(".goo_num").text("x" + $(this).parents(".add-cut").find(".good-num").text());
			$(this).parents(".shop2").find(".dera_price2").text(parseInt($(this).parents(".shop2").find(".dera_price2").text()) / (parseInt($(this).parents(".add-cut").find(".good-num").text()) - 1) * parseInt($(this).parents(".add-cut").find(".good-num").text()));
			isAllcheck();
			//			}

		})
	})
	//删除
	$.each($(".del_te"), function() {
		$(this).click(function() {
			$(this).parents(".shop2").remove();
			isAllcheck();
		})
	})
	//商店数目
	function shopnu() {
		$.each($(".shop"), function() {
			if($(this).parent(".top2").find(".shop2").length == 0) {
				$(this).parent(".top2").remove();
			}
		});
	}
	//
	$.each($(".good-kind"), function(i) {
		$.each($(this).find(".colo-cha"), function(j) {
			$(this).click(function() {
				$(this).parents(".good-kind").find('.colo-cha').removeClass("colo-ch");
				$(this).addClass("colo-ch");
				$th[i] = j;
			})
		});
	});
	$.each($(".good-kind"), function(i) {
		$.each($(this).find(".colo-cha2"), function(j) {
			$(this).click(function() {
				$(this).parents(".good-kind").find('.colo-cha2').removeClass("colo-ch");
				$(this).addClass("colo-ch");
				$th2[i] = j;
			})
		});
	});
	$tttt = 0;
	$.each($(".guig"), function(i) {
		$(this).click(function() {
			$(".cover-detail").css("display", "block");
			$(".good-kind").eq(i).animate({
				bottom: "0"
			}, 1000)
			$tttt = i;
		})
	});
	$.each($(".ok-btn2"), function(i) {
		$(this).click(function() {
			$(".good-kind").eq(i).animate({
				bottom: "-75%"
			}, 1000, function() {
				$(".cover-detail").css("display", "none");
				$(".dera_color").eq(i).text($(".good-kind").eq(i).find('.colo-cha').eq($th[i]).text() + ";" + $(".good-kind").eq(i).find('.colo-cha2').eq($th2[i]).text() + ";");
				$(".guig p").eq(i).text($(".good-kind").eq(i).find('.colo-cha').eq($th[i]).text() + ";" + $(".good-kind").eq(i).find('.colo-cha2').eq($th2[i]).text() + ";");
			})
		})
	});
	//领取优惠券
	$(".lj").click(function() {
		$(".clickj_wrap").css("display", "block");
		$(".clickj").animate({
			bottom: "0"
		}, 1000)
	})
	//	$(".clickj_wrap").click(function() {
	//		$(".clickj").animate({
	//			bottom: "-70%"
	//		}, 1000, function() {
	//			$(".clickj_wrap").css("display", "none");
	//
	//		})
	//	})
	$.each($(".js-coupon"), function(i) {
		$(this).click(function() {
			$(this).addClass("yiling");
			$(this).find(".coupon-price-wrap").css("opacity", "0.4");
			$(this).find(".coupon-detail").css("opacity", "0.4");
			$(".clickj").delay(3000).animate({
				bottom: "-70%"
			}, 1000, function() {
				$(".clickj_wrap").css("display", "none");

			})
		})
	});

})