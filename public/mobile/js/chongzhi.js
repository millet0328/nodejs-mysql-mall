$(document).ready(function() {
	//关闭小广告
	$(".tips-close").click(function() {
		$(".news-box").css("display", "none");
	})
	//输入手机号
	$(".munb").click(function() {
		$(this).css("display", "none");
		$("#tel").css("opacity", "1");
		$("#tel").focus();
	})
	$("#tel").blur(function() {
		$("#tel").css("opacity", "0");
		$(".munb").css("display", "block");
	})
	$(".showgood1_1").click(function() {
		$(this).css("display", "none");
		$(".showgood1").css("display", "block");

	})
	$(".showgood2_1").click(function() {
		$(this).css("display", "none");
		$(".showgood2").css("display", "block");

	})
	$(".go-buy").click(function () {
		location.href="order-buy.html"
	})
})