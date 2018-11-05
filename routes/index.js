var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
/**
 * @api {get} /api/goods/ 获取商品列表
 * @apiDescription 具备商品分页功能
 * @apiName /goods/ 获取商品列表
 * @apiGroup Goods
 * 
 * @apiParam {Number} pageSize 一个页有多少个商品,默认4个;
 * @apiParam {Number} pageIndex 第几页,默认1;
 * @apiParam {Number} cate_1st 一级分类id;
 * @apiParam {Number} cate_2nd 二级分类id;
 * @apiParam {Number} cate_3rd 三级分类id;
 * @apiParam {String} sortByPrice 按照价格排序，从小到大-ASC,从大到小-DESC;
 * @apiSampleRequest /api/goods/
 */
router.get("/goods/", function(req, res) {
	let defaultOpt = {
		pageSize: 4,
		pageIndex: 1,
		sortByPrice: ''
	}
	for(let key in req.query) {
		if(!req.query[key]) {
			delete req.query[key]
		}
	}
	let opt = Object.assign({}, defaultOpt, req.query);
	let size = parseInt(opt.pageSize);
	let count = size * (opt.pageIndex - 1);
	let sql = `SELECT * FROM GOODS WHERE cate_1st = ? AND cate_2nd = ? AND cate_3rd = ? ORDER BY price ${opt.sortByPrice}, create_time ASC`
	db.query(sql, [opt.cate_1st, opt.cate_2nd, opt.cate_3rd], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			data: results
		});
	});
});

//获取商品详情
/*
 id 商品id
 */
router.get("/goods/detail/", function(req, res) {
	Goods
		.findOne(req.query)
		.populate('category_1st')
		.exec(function(err, doc) {
			if(err) {
				console.log(err);
				return;
			}
			if(!doc) {
				res.json({
					status: false,
					msg: "暂无商品！"
				});
				return;
			}
			res.json({
				status: true,
				msg: "获取成功！",
				data: doc
			});
		});
});

module.exports = router;