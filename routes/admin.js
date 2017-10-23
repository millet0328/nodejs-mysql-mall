var express = require('express');
var router = express.Router();
//文件传输
var multer = require('multer');
var upload = multer();
//图片处理
var images = require("images");

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
//获取一级分类
router.get("/getCategory/first/", function(req, res) {
	Category.find({
		level: 0
	}, function(err, docs) {
		if(err) {
			console.log(err);
			return;
		}
		if(!docs.length) {
			res.json({
				status: false,
				msg: "暂无一级分类！"
			});
			return;
		}
		res.json({
			status: true,
			msg: "获取成功！",
			data: docs
		});

	});
});

//根据传参，获取对应的二级/三级分类
router.get("/getCategory/sub", function(req, res) {
	Category.find(req.query, function(err, docs) {
		if(err) {
			console.log(err);
			return;
		}
		if(!docs.length) {
			res.json({
				status: false,
				msg: "暂无分类！"
			});
			return;
		}
		res.json({
			status: true,
			msg: "获取成功！",
			data: docs
		});
	});
});

//图片接口
router.post("/upload/img", upload.single('file'), function(req, res) {
	images(req.file.buffer)
		.resize(720) //缩放尺寸至720宽
		.save("public/images/goods/" + req.file.originalname, {
			quality: 70 //保存图片到文件,图片质量为70
		});
});

module.exports = router;