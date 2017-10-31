$(document).ready(function() {
	$(".guan").click(function() {
		$(".moneycart_cover").css("display", "block");
		$(".cart_botto").animate({
			bottom: "0"
		}, 1000);
	})
	$(".qx").click(function() {
		$(".cart_botto").animate({
			bottom: "-141px"
		}, 1000, function() {
			$(".moneycart_cover").css("display", "none");
		});
	})
})