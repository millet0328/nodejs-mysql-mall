$(function () {
	var $checkAll = $(".btm .btm01 .check_all");
	var $check = $("input[name='check_one']");
	var $priceAdd = $(".good_list .goods .count .add");
	var $priceReduce = $(".good_list .goods .count .reduce");
	var $all = $(".btm .btm03 #total");
	var $delete = $(".good_list .title .delete");
	var numCount;
	var onePrice;
	
	//全选按钮是否选中
	$checkAll.click(function() {
		if($checkAll.prop("checked")) {
			$check.prop("checked", true);
		} else {
			$check.prop("checked", false);
		}
		allPrice();
	})
	//商品被选中
	$check.click(function() {
		isCheckAll();
		allPrice();
	})
	//判断商品是否全选
	function isCheckAll() {
		var num = 0;
		$check = $("input[name='check_one']");
		$check.each(function(i) {
			if($(this).prop("checked"))
				num++;
		})
		if(num == $check.length) {
			$checkAll.prop("checked", true);
		} else {
			$checkAll.prop("checked", false);
		}
	}
	//数量增加
	$priceAdd.click(function() {
		numCount=parseFloat($(this).siblings(".count_num").val());
		numCount++;
		$(this).siblings(".count_num").val(numCount);
		allPrice();
	})
	//数量减少
	$priceReduce.click(function() {
		numCount=parseInt($(this).siblings(".count_num").val());
		if(numCount>1){
			numCount--;
		}else{
			numCount=1;
		}		
		$(this).siblings(".count_num").val(numCount);
		allPrice();
	})	
	//删除
	$delete.click(function() {
		$(this).parents('.good_list').remove();
		isCheckAll();
		allPrice();
	})
	//总价
	function allPrice() {
		$check = $("input[name='check_one']");
		var sum = 0;
		$check.each(function(i) {
			if($(this).prop("checked")) {
				var num = parseFloat($(this).parents(".goods").find(".price").text().slice(1));				
				var index=parseFloat($(this).parents(".goods").find(".count_num").val());
				sum += num*index;
			}
		})
		$all.text('￥' + sum.toFixed(2));
	}
})
