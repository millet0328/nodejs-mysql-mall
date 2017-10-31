$(document).ready(function() {
	$(".guan").click(function() {
			$(".guan").css("display","none");
			$(".guan_").css("display","inline-block");
			$(".manage-box").css("display", "block");
			$(".add-new").css("display", "block");
	})
	$(".guan_").click(function() {
			$(".guan_").css("display","none");
			$(".guan").css("display","inline-block");
			$(".manage-box").css("display", "none");
			$(".add-new").css("display", "none");

	})
	//
	
	$("ul").on("click", ".ssc", function() {
		$(this).click(function() {
			$(this).parents("li").remove();
		})
	})
	$(".gogogo").click(function() {
		$(".dingw").css("display", "none");
	})
	
	//添加地址

	$(".add-new").click(function() {
		$(".dingw2").css("display", "block");
		$(".dingw2").find(".myname input").val('');
		$(".dingw2").find(".mytel input").val('');
		$(".dingw2").find(".mytitle2 input").val('');
		$(".dingw2").find(".address-cn2").text("设为默认");
		$(".dingw2").find("#default-btn2").removeClass('active');
		$copy = $(".address-item").eq(0).clone();
		//保存
		$this = $(this);
	})
	//
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
	$("#bj1").click(function() {
		if($("#tips2").css("opacity") == "1") {
			$("#tips2").stop().animate({
				opacity: "1"
			}, 2000, function() {
				$("#tips2").css("opacity", "0");
				$("#tips2").css("display", "none");
			})
		}
	})
	// 
	$chek=0;
	$(".okok2").click(function(){
		if($chek==0){
			$(this).addClass("active");
			$(".t_f").val("true");
			$(this).siblings('.address-cn2').text("默认地址");
			$chek=1;
		}else{
			$(this).removeClass("active");
			$(".t_f").val("false");
			$(this).siblings('.address-cn2').text("设为默认");
			$chek=0;
		}
	})

})