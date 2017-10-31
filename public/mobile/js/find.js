$(document).ready(function() {
//	$("#btn_sub").click(function() {
//		if($("#tips").css("opacity") == "1") {
//			$("#tips").stop().animate({
//				opacity: "1"
//			}, 3000, function() {
//				$("#tips").css("opacity", "0");
//				$("#tips").css("display", "none");
//			})
//		}
//	})
	$("#login_btn").click(function() {
		if($("#tips").css("opacity") == "1") {
			$("#tips").stop().animate({
				opacity: "1"
			}, 3000, function() {
				$("#tips").css("opacity", "0");
				$("#tips").css("display", "none");
			})
		}
	})
})