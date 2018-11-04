var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');
//文件传输
var multer = require('multer');
var upload = multer();
//图片处理
var images = require("images");
//uuid
var uuidv1 = require('uuid/v1');
/**
 * @api {get} /api/category/all/ 获取所有树形分类
 * @apiName category/all 获取所有树形分类
 * @apiGroup Category
 * 
 * @apiSampleRequest /api/category/all/
 */
router.get("/category/all", function(req, res) {
	let sql = `SELECT * FROM CATEGORIES `;
	db.query(sql, [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "获取成功！",
			data: results
		});
	});
});
/**
 * @api {post} /api/category/add/ 添加子分类
 * @apiName category/add 添加子分类
 * @apiGroup Category
 * 
 * @apiParam {String} name 分类名称.
 * @apiParam {Number} pId 父级id.
 * @apiParam {Number} level 分类所在层级.
 * 
 * @apiSampleRequest /api/category/add/
 */
router.post("/category/add", function(req, res) {
	let sql = `INSERT INTO CATEGORIES (name,pId,level) VALUES (?,?,?) `;
	db.query(sql, [req.body.name, req.body.pId, req.body.level], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "插入成功！",
			data: {
				id: results.insertId
			}
		});
	});
});
/**
 * @api {post} /api/category/delete/ 删除分类
 * @apiName category/delete 删除分类
 * @apiGroup Category
 * 
 * @apiParam {Number} id 分类id.
 * 
 * @apiSampleRequest /api/category/delete/
 */
router.post("/category/delete", function(req, res) {
	let sql = `DELETE FROM CATEGORIES WHERE id = ?`;
	db.query(sql, [req.body.id], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "删除成功！"
		});
	});
});
/**
 * @api {post} /api/category/update/ 更新分类
 * @apiName category/update 更新分类
 * @apiGroup Category
 * 
 * @apiParam {Number} id 分类id.
 * @apiParam {String} name 分类名称.
 * 
 * @apiSampleRequest /api/category/update/
 */
router.post("/category/update", function(req, res) {
	let sql = `UPDATE CATEGORIES SET name= ? WHERE id = ? `;
	db.query(sql, [req.body.name, req.body.id], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "更新成功！"
		});
	});
});
/**
 * @api {get} /api/category/sub/ 获取子级分类
 * @apiName category/sub
 * @apiGroup Category
 * 
 * @apiParam {Number} pId 父级分类id。注：获取一级分类pId=1;
 * 
 * @apiSampleRequest /api/category/sub/
 */
router.get("/category/sub/", function(req, res) {
	let sql = `SELECT * FROM CATEGORIES WHERE pId = ? `;
	db.query(sql, [req.query.pId], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "获取成功！",
			data: results
		});
	});
});
/**
 * @api {post} /api/upload/goods/ 上传商品主图
 * @apiDescription 上传图片会自动检测图片质量，压缩图片，体积<2M，尺寸（300~1500），存储至goods文件夹
 * @apiName upload/goods/
 * @apiGroup Upload Image
 * 
 * @apiParam {File} file File文件对象;
 * 
 * @apiSampleRequest /api/upload/goods/
 * 
 * @apiSuccess {String} lgImg 返回720宽度图片地址.
 * @apiSuccess {String} mdImg 返回360宽度图片地址.
 */
router.post("/upload/goods/", upload.single('file'), function(req, res) {
	//文件类型
	var type = req.file.mimetype;
	var size = req.file.size;
	//判断是否为图片
	var reg = /^image\/\w+$/;
	var flag = reg.test(type);
	if(!flag) {
		res.json({
			status: false,
			msg: "格式错误，请选择一张图片！"
		});
		return;
	}
	//判断图片体积是否小于2M
	if(size >= 2 * 1024 * 1024) {
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
	//处理原文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	//扩展名
	var extName = "." + formate[formate.length - 1];
	var filename = uuidv1();
	//储存文件夹
	var fileFolder = "/images/goods/";

	images(req.file.buffer)
		.resize(720) //缩放尺寸至720宽
		.save("public" + fileFolder + filename + "_720" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});

	images(req.file.buffer)
		.resize(360) //缩放尺寸至360宽
		.save("public" + fileFolder + filename + "_360" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	//返回储存结果
	res.json({
		status: true,
		msg: "图片上传处理成功！",
		lgImg: fileFolder + filename + "_720" + extName,
		mdImg: fileFolder + filename + "_360" + extName
	});
});

/**
 * @api {post} /api/upload/slider/ 轮播图上传API
 * @apiDescription 上传图片会自动检测图片质量，压缩图片，体积<2M，尺寸（300~1500）必须是正方形，存储至goods文件夹
 * @apiName upload/slider/
 * @apiGroup Upload Image
 * 
 * @apiParam {File} file File文件对象;
 * 
 * @apiSampleRequest /api/upload/slider/
 * 
 * @apiSuccess {String} src 返回720宽度图片地址.
 */
router.post("/upload/slider", upload.single('file'), function(req, res) {
	//文件类型
	var type = req.file.mimetype;
	var size = req.file.size;
	//判断是否为图片
	var reg = /^image\/\w+$/;
	var flag = reg.test(type);
	if(!flag) {
		res.json({
			status: false,
			msg: "格式错误，请选择一张图片！"
		});
		return;
	}
	//判断图片体积是否小于2M
	if(size >= 2 * 1024 * 1024) {
		res.json({
			status: false,
			msg: "图片体积太大，请压缩图片！"
		});
		return;
	}
	//判读图片尺寸
	var width = images(req.file.buffer).width();
	var height = images(req.file.buffer).height();
	if(width != height) {
		res.json({
			status: false,
			msg: "图片尺寸800*800，请重新上传!"
		});
		return;
	}
	if(width < 300 || width > 1500) {
		res.json({
			status: false,
			msg: "图片尺寸300-1500，请重新处理!"
		});
		return;
	}
	//处理原文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	//扩展名
	var extName = "." + formate[formate.length - 1];
	var filename = uuidv1();
	//储存文件夹
	var fileFolder = "/images/goods/";
	//处理图片
	images(req.file.buffer)
		.resize(720) //缩放尺寸至720宽
		.save("public" + fileFolder + filename + "_720" + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	//返回储存结果
	res.json({
		status: true,
		msg: "图片上传处理成功！",
		src: fileFolder + filename + "_720" + extName
	});
});
/**
 * @api {post} /api/upload/common/ 通用图片上传API
 * @apiDescription 上传图片会自动检测图片质量，压缩图片，体积<2M，不限制尺寸，存储至details文件夹
 * @apiName upload/common/
 * @apiGroup Upload Image
 * 
 * @apiParam {File} file File文件对象;
 * 
 * @apiSampleRequest /api/upload/common/
 * 
 * @apiSuccess {String[]} data 返回图片地址.
 */
router.post("/upload/common", upload.single('file'), function(req, res) {
	//文件类型
	var type = req.file.mimetype;
	var size = req.file.size;
	//判断是否为图片
	var reg = /^image\/\w+$/;
	var flag = reg.test(type);
	if(!flag) {
		res.json({
			errno: 1,
			msg: "格式错误，请选择一张图片！"
		});
		return;
	}
	//判断图片体积是否小于2M
	if(size >= 2 * 1024 * 1024) {
		res.json({
			errno: 1,
			msg: "图片体积太大，请压缩图片！"
		});
		return;
	}
	//处理原文件名
	var originalName = req.file.originalname;
	var formate = originalName.split(".");
	//扩展名
	var extName = "." + formate[formate.length - 1];
	var filename = uuidv1();
	//储存文件夹
	var fileFolder = "/images/details/";
	//处理图片
	images(req.file.buffer)
		.save("public" + fileFolder + filename + extName, {
			quality: 70 //保存图片到文件,图片质量为70
		});
	//返回储存结果
	res.json({
		errno: 0,
		msg: "图片上传处理成功！",
		data: [fileFolder + filename + extName]
	});
});

//发布商品
/*
参数：参照商品Schema
*/
router.post("/goods/release", function(req, res) {
	var goods = new Goods(req.body);
	goods.save(function(err, doc) {
		if(err) {
			console.log(err);
			return;
		}
		res.json({
			status: true,
			msg: "发布成功！"
		});
	});
});

module.exports = router;