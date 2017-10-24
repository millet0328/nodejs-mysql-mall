var express = require('express');
var router = express.Router();
//文件传输
var multer = require('multer');
var upload = multer();
//图片处理
var images = require("images");
//uuid
var uuidv1 = require('uuid/v1');

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
	console.log(req.file);
	//判断是否为图片
	var Exg = /^image\/\w+$/;
	var flag = Exg.test(req.file.mimetype);
	if(!flag) {
		res.json({
			status: false,
			msg: "格式错误，请选择一张图片！"
		});
		return;
	}
	//判断图片体积是否小于2M
	if(req.file.size >= 2 * 1024 * 1024) {
		res.json({
			status: false,
			msg: "图片体积太大，请压缩图片！"
		});
		return;
	}
	//判读图片尺寸
	var width = images(req.file.buffer).width();
	if(width < 300 || width > 1500) {
		res.json({
			status: false,
			msg: "图片尺寸300-1500，请重新处理!"
		});
		return;
	}
	//处理图片文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	//扩展名
	var extName = "." + formate[formate.length - 1];
	var filename = uuidv1();
	//储存文件夹
	var fileFolder = "/images/goods/";

	images(req.file.buffer)
		.resize(720) //缩放尺寸至720宽
		.save("public" + fileFolder + filename + "_lg" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});

	images(req.file.buffer)
		.resize(360) //缩放尺寸至360宽
		.save("public" + fileFolder + filename + "_md" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	//返回储存结果
	res.json({
		status: true,
		msg: "图片上传处理成功！",
		lgImg: fileFolder + filename + "_lg" + extName,
		mdImg: fileFolder + filename + "_md" + extName
	});

});

module.exports = router;