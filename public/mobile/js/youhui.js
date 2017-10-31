$(document).ready(function() {
	//拖动导航条
	var Hammer = $.AMUI.Hammer;
	var oDao = document.getElementById("dao");
	var hammer1 = new Hammer(oDao);
	var w = window.innerWidth;
	var left1 = oDao.offsetLeft;
	hammer1.on("panstart", function(ev) {
		var left = oDao.offsetLeft;
		var flag = 0;
		var ww = oDao.clientWidth;
		var t = ww - w;
		hammer1.on("panmove", function(ev) {
			oDao.style.left = left + ev.deltaX + "px";
		})
		hammer1.on("panend", function(ev) {
			left = oDao.offsetLeft;
			if(left >= left1) {
				oDao.style.left = left1 + "px";
			} else if(left <= -t - left1) {
				oDao.style.left = -t - left1 + "px";
			}
		})
	})
	//点击导航条项目
	$tep1 = 0;
	$.each($(".dao_text"), function(i) {
		$(this).click(function() {
			$(".dao_text").removeClass("change1");
			$(this).addClass("change1");
			$tep1 = i;
			$(".gowu").css("display", "none");
			$(".gowu").eq($tep1).css("display", "block");
			if($(".gowu").eq($tep1).find(".js-coupon").length == 0) {
				$(".non1").css("display", "block");
			} else {
				$(".non1").css("display", "none");
			}
		})
	})
	//点击下拉
	$(".xiala").each(function(i) {
		$(this).click(function() {
			if($(this).find("i")[0].classList.length == 0) {
				$(this).find("i").addClass("xia");
				$(this).parents(".js-coupon").find(".ul-explain-list").css("display", "block");
			} else {
				$(this).find("i").removeClass("xia");
				$(this).parents(".js-coupon").find(".ul-explain-list").css("display", "none");
			}
		})
	})
	$tr = 0;
	$(".weishiyong").click(function() {
		$tr = $tr + 1;
		if($tr % 2 != 0) {
			$(".alljuan").css("display", "block");
		} else {
			$(".alljuan").css("display", "none");
		}
	})
	$(".wei").each(function(i) {
		$(this).click(function() {
			$(".wei").removeClass("change7");
			$(this).addClass("change7");
			$(".alljuan").css("display", "none");
			$(".weishiyong").text($(this).text());
			$tr++;
		})
	})
})