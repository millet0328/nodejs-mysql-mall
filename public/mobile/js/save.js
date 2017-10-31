$(document).ready(function() {
	$t = 0;
	$(".item_1").each(function(i) {
		$(this).click(function() {
			$t = i;
			$(".item_1").removeClass("border6");
			$(this).addClass("border6");
			if($t == 0) {
				$(".shop2").css("display", "block");
				$(".shop3").css("display", "none");
			} else {
				$(".shop3").css("display", "block");
				$(".shop2").css("display", "none");
			}
			check();
		})
	})
	//取消收藏
	function check() {
		$num1 = $(".shop2").length;
		$num2 = $(".shop3").length;
		if($t == 0) {
			$(".non2").css("display", "none");
			if($num1 == 0) {
				$(".non1").css("display", "block");
			} else {
				$(".non1").css("display", "none");
			}
		} else {
			$(".non1").css("display", "none");
			if($num2 == 0) {
				$(".non2").css("display", "block");
			} else {
				$(".non2").css("display", "none");
			}
		}

	}
	$(".xin").each(function(i) {
		$(this).click(function() {
			$(this).parents(".shopping").remove();
			$(".qxsave").css("display", "block");
			$tick = null;
			$tick = setTimeout(function() {
				$(".qxsave").css("display", "none");
			}, 1000)
			check();
		})
	})

})