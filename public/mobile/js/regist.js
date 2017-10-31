$(document).ready(function() {
    $("#next-btn").click(function() {
        if ($("#tips").css("opacity") == "1") {
            $("#tips").stop().animate({
                opacity: "1"
            }, 3000, function() {
                $("#tips").css("opacity", "0");
                $("#tips").css("display", "none");
            })
        }
    })
    $("#next-btn2").click(function() {
        if ($("#tips2").css("opacity") == "1") {
            $("#tips2").stop().animate({
                opacity: "1"
            }, 3000, function() {
                $("#tips2").css("opacity", "0");
                $("#tips2").css("display", "none");
            })
        }
    })

})