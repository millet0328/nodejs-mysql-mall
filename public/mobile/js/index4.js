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
	//拖动导航条2
	var oDao2 = document.getElementById("dao2");
	var hammer3 = new Hammer(oDao2);
	var left1_2 = oDao2.offsetLeft;
	hammer3.on("panstart", function(ev) {
		var left = oDao2.offsetLeft;
		var flag = 0;
		var ww = oDao2.clientWidth;
		var t = ww - w;
		hammer3.on("panmove", function(ev) {
			oDao2.style.left = left + ev.deltaX + "px";
		})
		hammer3.on("panend", function(ev) {
			left = oDao2.offsetLeft;
			if(left >= left1_2) {
				oDao2.style.left = left1_2 + "px";
//				console.log(333)
			} else if(left <= -t - left1_2) {
				oDao2.style.left = -t - left1_2 + "px";
//				console.log(444)
			}
		})
	})
	//点击下拉条
	$(".zhankai").click(function() {
		$(".bg3").css("display", "block")
	})
	$(".choose_icon1").click(function() {
		$(".bg3").css("display", "none")
	})
	//点击导航条项目
	$tep1 = 0;
	$.each($(".dao_text"), function(i) {
		$(this).click(function() {
			$(".dao_text").removeClass("change1");
			$(this).addClass("change1");
			$tep1 = i;
			$(".dao_text2").removeClass("change2")
			$(".dao_text2").eq($tep1).addClass("change2");

		})
	})
	$.each($(".dao_text2"), function(i) {
		$(this).click(function() {
			$(".dao_text2").removeClass("change2");
			$(this).addClass("change2");
			$tep1 = i;
			$(".dao_text").removeClass("change1")
			$(".dao_text").eq($tep1).addClass("change1");

		})
	})
	//点击导航条项目2
	$.each($(".dao_text3"), function(i) {
		$(this).click(function() {
			$(".dao_text3").removeClass("change6");
			$(this).addClass("change6");
			$(".sj_co").removeClass("block");
			$(".sj_co").eq(i).addClass("block");
		})
	})

	//拖动
	var oModel = document.querySelectorAll(".model");
	var arr = [];
	var left3 = [];
	for(var i = 0; i < oModel.length; i++) {
		arr.push(new Hammer(oModel[i]));
		left3.push(oModel[i].offsetLeft);
	}
	$.each(arr, function(i) {
		arr[i].on("panstart", function(ev) {
			var left = oModel[i].offsetLeft;
			console.log(left)
			var flag = 0;
			var ww = oModel[i].clientWidth;
			var t = ww - w;
			arr[i].on("panmove", function(ev) {
				oModel[i].style.left = left + ev.deltaX + "px";
			})
			arr[i].on("panend", function(ev) {
				left = oModel[i].offsetLeft;
				if(left >= left3[i]) {
					oModel[i].style.left = left3[i] + "px";
				} else if(left <= -t - left3[i]) {
					oModel[i].style.left = -t - left3[i] + "px";
				}
			})
		})
	});
	$(".model_pic img").click(function() {
		location.href = "detail.html";
	})
	//拖动新人礼
	var oShow = document.getElementById("show");
	var hammer2 = new Hammer(oShow);
	var left2 = oShow.offsetLeft;
	hammer2.on("panstart", function(ev) {
		var left = oShow.offsetLeft;
		var flag = 0;
		var ww = oShow.clientWidth;
		var t = ww - w;
		hammer2.on("panmove", function(ev) {
			oShow.style.left = left + ev.deltaX + "px";
		})
		hammer2.on("panend", function(ev) {
			left = oShow.offsetLeft;
			if(left >= left2) {
				oShow.style.left = left2 + "px";
			} else if(left <= -t - left2) {
				oShow.style.left = -t - left2 + "px";
			}
		})
	})

	//倒计时
	function istwo(n) {
		if(n < 10) {
			n = "0" + n;
		} else {
			n = "" + n;
		}
		return n;
	}
	var timer = null;
	var ordertime = new Date();
	if(ordertime.getTime() % 1000 != 0) {
		ordertime = new Date(ordertime.getTime() - ordertime.getTime() % 1000);
	}
	var endtime = new Date(ordertime.getTime() + 24 * 60 * 60 * 1000);
	timer = setInterval(function() {
		var currenttime = new Date();
		if(currenttime.getTime() % 1000 != 0) {
			currenttime = new Date(currenttime.getTime() - currenttime.getTime() % 1000);
		}
		var dec = endtime.getTime() - currenttime.getTime();
		var sec = istwo(((dec / 1000) % 60));
		var min = istwo(parseInt((dec / (1000 * 60)) % 60));
		var hour = istwo(parseInt((dec / (1000 * 60 * 60)) % 24));
		$(".dao_h").eq(0)[0].innerText = hour;
		$(".dao_m").eq(0)[0].innerText = min;
		$(".dao_s").eq(0)[0].innerText = sec;
	}, 1000);

})