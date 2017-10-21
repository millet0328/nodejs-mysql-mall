var express = require('express');
var router = express.Router();
// 数据结构
var models = require("../models/models");

var Category = models.Category;
router.post("/setCategory/", function(req, res) {
	var arr = req.body.categories;
	if(!arr.length) {
		res.json({
			status: false,
			msg: "储存失败，没有分类信息！"
		});
		return;
	}
	Category.remove({}, function() {
		for(var i = 0; i < arr.length; i++) {
			var category = new Category(arr[i]);
			category.save(function(err) {
				if(err) {
					console.log(err);
					return;
				}
			});
		}
		res.json({
			status: true,
			msg: "储存成功！"
		});
	});
});

router.get("/getCategory/", function(req, res) {
	Category
		.find({})
		.select("id pId name")
		.exec(function(err, docs) {
			if(err) {
				console.log(err);
				return;
			}
			res.json({
				status: true,
				msg: "获取成功！",
				data: docs
			});
		});
});

module.exports = router;