$(document).ready(function() {
	$("#bj2").click(function() {
		if($("#tips").css("opacity") == "1") {
			$("#tips").stop().animate({
				opacity: "1"
			}, 2000, function() {
				$("#tips").css("opacity", "0");
				$("#tips").css("display", "none");
			})
		}
	})
	//	$bj=0;
	$("#bj").click(function() {
		//		if($bj==0){
		$(".tilt1").css("display", "none");
		$(".tilt2").css("display", "block");
		$("#bj").css("display", "none");
		//		}else{
		//			
		//		}
	})
	
})