$(document).ready(function () {
	$.each($(".good-list-title li span"), function(i) {
		$(this).click(function () {
			$(".good-list-title li span").removeClass("color-ch");
			$(this).addClass("color-ch");
		})
	});
})
