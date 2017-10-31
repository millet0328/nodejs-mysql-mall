$(document).ready(function() {
	$(".kj_login1").click(function() {
		$("#tips").css("opacity", "0");
		$("#tips").css("display", "none");
		$(".login_1").css("display", "none");
		$(".login_2").css("display", "block");
	})
	$(".kj_login2").click(function() {
		$("#tips2").css("opacity", "0");
		$("#tips2").css("display", "none");
		$(".login_2").css("display", "none");
		$(".login_1").css("display", "block");
	})
	$("#btn_sub").click(function() {
		if($("#tips").css("opacity") == "1") {
			$("#tips").stop().animate({
				opacity: "1"
			}, 3000, function() {
				$("#tips").css("opacity", "0");
				$("#tips").css("display", "none");
			})
		}
	})
	$("#login_btn").click(function() {
		if($("#tips2").css("opacity") == "1") {
			$("#tips2").stop().animate({
				opacity: "1"
			}, 3000, function() {
				$("#tips2").css("opacity", "0");
				$("#tips2").css("display", "none");
			})
		}
	})
})