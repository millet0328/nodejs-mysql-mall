$(document).ready(function() {
    $.each($(".click_picr"), function(index, el) {
        $(this).click(function() {
            $(this).parent(".pj_pic1").find(".cover1").css("z-index", "1011").css("opacity", "1");
            $(this).parent(".pj_pic1").find(".cover2").stop().animate({
                right: "0"
            }, 1000)
        })
    });

    $.each($(".cover1"), function() {
        $(this).click(function() {
        	$this=$(this);
            $(this).parent(".pj_pic1").find(".cover2").stop().animate({
                right: "-80%"
            }, 1000, function() {
                $this.css("z-index", "-1").css("opacity", "0");
            })
        })
    });
    $(".oBg3").find("img").click(function() {
        location.href = "chongzhi.html";
    })
   
})