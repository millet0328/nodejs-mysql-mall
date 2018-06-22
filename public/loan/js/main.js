$(window).ready(function() {

	$(".page-1 .manage").click(function() {
		$(".page-1").css("display", "none")
		$(".page-2").css("display", "block")
	})
	$(".page-2 .go-back").click(function() {
		$(".page-2").css("display", "none")
		$(".page-1").css("display", "block");
	})
	$(".page-2 .add-new").click(function() {
		$(".page-2").css("display", "none")
		$(".page-3").css("display", "block")
	});
	$(".page-3 .go-back").click(function() {
		$(".page-3").css("display", "none")
		$(".page-2").css("display", "block");
	})
	$(".page-4 .go-back").click(function() {
		$(".page-4").css("display", "none")
		$(".page-2").css("display", "block");
	})
	//设置默认地址
	$(".address-list").on("click", ".default-btn-icon", function() {
		console.log($(this).parents(".address-item").index());
		var index = $(this).parents(".address-item").index()
		$(".default-btn-icon").removeClass("active");
		$(this).addClass("active");
		$(".page-2 .person-default-logo").removeClass("logo-active");
		$(this).parents(".address-item").find(".person-default-logo").addClass("logo-active");
		$(".page-2 .address-cn").text("设为默认");
		$(this).parents(".address-item").find(".address-cn").text("默认地址");
		$(".page-1 .person-default-logo").removeClass("logo-active");
		$(".page-1 .address-list .address-item").eq(index).find(".person-default-logo").addClass("logo-active");
	});
	//点击删除地址
	$(".address-list").on("click", ".del-btn", function() {
		//判断剩余地址个数，大于一可以删，小于一不能删
		var n = $(".page-2 .address-list .address-item").length;
		if(n == 1) {
			$(".tips-cover1").fadeIn(500);
			$(".tips-cover1 .ok-btn1").click(function() {
				$(".tips-cover1").fadeOut(500);
			})
		} else {
			var self = $(this);
			var index = $(this).parents(".address-item").index();
			$(".tips-cover").fadeIn(500);
			$(".tips-cover .cancel-btn").click(function() {
				$(".tips-cover").fadeOut(500)
			})
			$(".tips-cover .ok-btn").click(function() {
				$(".tips-cover").fadeOut(500);
				self.parents(".address-item").remove();
				$(".page-1 .address-list .address-item").eq(index).remove();
				add_default();
			});
		}
	});
	var edit_no = 0;
	var new_no = 0;
	//点击编辑地址
	$(".address-list").on("click", ".edit-btn", function() {
		var index = $(this).parents(".address-item").index();
		edit_no = index;
		$(".page-2").css("display", "none")
		$(".page-4").css("display", "block");
		//点击编辑按钮原来信息到修改页面
		var name = $(".page-2 .person-name").eq(index).text();
		var tel = $(".page-2 .person-tel").eq(index).text();
		console.log(tel)
		var add = $(".page-2 .person-province").eq(index).text() + " " + $(".person-city").eq(index).text() + " " + $(".person-county").eq(index).text();
		var add_del = $(".page-2 .person-detail").eq(index).text();
		$(".page-4 input[name='person-name']").val(name);
		$(".page-4 input[name='person-tel']").val(tel);
		$(".page-4 textarea[name='person-detail']").val(add_del);
		$(".page-4 input[name='person-address']").val(add);
	});
	//如果没有默认地址，添加第一个为默认地址
	function add_default() {
		var n = 0;
		$.each($(".page-2 .address-list .address-item .default-btn-icon"), function() {
			if($(this).hasClass("active")) {
				n = 1;
				return;
			}
		});
		console.log(n)
		if(n == 0) {
			$(".page-2 .address-list .address-item").eq(0).find(".default-btn-icon").addClass("active");
			$(".page-2 .address-list .address-item").eq(0).find(".person-default-logo").addClass("logo-active");
			$(".page-1 .address-list .address-item").eq(0).find(".default-btn-icon").addClass("active");
			$(".page-1 .address-list .address-item").eq(0).find(".person-default-logo").addClass("logo-active");
		}
	}

	//新增地址表单验证
	$("#page3-form").Validform({
		btnSubmit: "#baocun-btn1",
		//		tiptype: 1,
		tiptype: function(msg) {
			showmsg(msg);
		},
		ignoreHidden: false,
		dragonfly: false,
		tipSweep: true,
		label: ".label",
		showAllError: false,
		postonce: true,
		datatype: {
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4": /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"myphone": /^[1][3,4,5,7,8][0-9]{9}$/,
		},
		beforeCheck: function(curform) {
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit: function(curform) {
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
			var name = $(".page-3 input[name='person-name']").val();
			var tel = $(".page-3 input[name='person-tel']").val();
			var add_del = $(".page-3 textarea[name='person-detail']").val();
			var add = $(".page-3 input[name='person-address']").val();
			console.log(name);
			console.log(tel);
			console.log(add);
			console.log(add_del);
			console.log(edit_no);
			$obj = $(".page-2 .address-list .address-item").eq(0).clone();
			$(".page-2 .address-list").append($obj);
			$obj.find(".person-default-logo").removeClass("logo-active")
			$obj.find(".default-btn-icon").removeClass("active")
			$obj.find(".address-cn").text("设为默认");
			$obj.find(".person-name").text(name);
			$obj.find(".person-tel").text(tel);
			var arr = [];
			$arr = add.split(" ");
			$obj.find(".person-province").text($arr[0]);
			$obj.find(".person-city").text($arr[1]);
			$obj.find(".person-county").text($arr[2]);
			$obj.find(".person-detail").text(add_del);
			$(".page-3").css("display", "none")
			$(".page-2").css("display", "block");
			return false;
		},
		callback: function(data) {
			//返回数据data是json对象，{"info":"demo info","status":"y"}
			//info: 输出提示信息;
			//status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
			//你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
			//ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；

			//这里执行回调操作;
			//注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。

			$(".page-3 input[name='person-name']").val("");
			$(".page-3 input[name='person-tel']").val("");
			$(".page-3 textarea[name='person-detail']").val("");
			$(".page-3 input[name='person-address']").val("");

		}
	});
	//点击第一页地址修改订单上的地址

	//修改地址表单验证
	var showmsg = function(msg) {
		$(".tips-box").text(msg);
		$(".tips-box").css("display", "block");
		setInterval(function() {
			$(".tips-box").css("display", "none");
		}, 3000)
	}
	$("#page4-form").Validform({
		btnSubmit: "#baocun-btn2",
		tiptype: function(msg) {
			showmsg(msg);
		},
		ignoreHidden: false,
		dragonfly: false,
		tipSweep: true,
		label: ".label",
		showAllError: false,
		postonce: true,
		datatype: {
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4": /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"myphone": /^[1][3,4,5,7,8][0-9]{9}$/,
		},
		beforeSubmit: function(curform) {
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
			$(".page-4").css("display", "none")
			$(".page-2").css("display", "block");
			var name = $(".page-4 input[name='person-name']").val();
			var tel = $(".page-4 input[name='person-tel']").val();
			var add = $(".page-4 input[name='person-address']").val();
			var add_del = $(".page-4 textarea[name='person-detail']").val();
			var arr = [];
			$arr = add.split(" ");
			console.log($arr[0]);
			console.log(name);
			console.log(tel);
			console.log(add);
			console.log(add_del);
			console.log(edit_no);
			//修改page2地址信息
			$(".page-2 .person-name").eq(edit_no).text(name);
			$(".page-2 .person-tel").eq(edit_no).text(tel);
			$(".page-2 .person-province").eq(edit_no).text($arr[0]);
			$(".page-2 .person-city").eq(edit_no).text($arr[1]);
			$(".page-2 .person-county").eq(edit_no).text($arr[2]);
			$(".page-2 .person-detail").eq(edit_no).text(add_del);
			//修改page2地址信息
			$(".page-1 .person-name").eq(edit_no).text(name);
			$(".page-1 .person-tel").eq(edit_no).text(tel);
			$(".page-1 .person-province").eq(edit_no).text($arr[0]);
			$(".page-1 .person-city").eq(edit_no).text($arr[1])
			$(".page-1 .person-county").eq(edit_no).text($arr[2])
			$(".page-1 .person-detail").eq(edit_no).text(add_del);
			return false;
		},
	});

	/**
	 * 默认调用
	 */
	! function() {
		var $target = $('#J_Address');

		$target.citySelect();

		$target.on('click', function(event) {
			event.stopPropagation();
			$target.citySelect('open');
		});

		$target.on('done.ydui.cityselect', function(ret) {
			$(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
		});
	}();

	/**
	 * 默认调用
	 */
	! function() {
		var $target = $('#J_Address1');

		$target.citySelect();

		$target.on('click', function(event) {
			event.stopPropagation();
			$target.citySelect('open');
		});

		$target.on('done.ydui.cityselect', function(ret) {
			$(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
		});
	}();
})