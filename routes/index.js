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
 * @apiDescription 具备商品分页功能，3个分类参数至多能传1个
 * @apiName /goods/ 获取商品列表
 * @apiGroup Goods
 * 
 * @apiParam {Number} [pageSize] 一个页有多少个商品,默认4个;
 * @apiParam {Number} [pageIndex] 第几页,默认1;
 * @apiParam {Number} [cate_1st] 一级分类id;
 * @apiParam {Number} [cate_2nd] 二级分类id;
 * @apiParam {Number} [cate_3rd] 三级分类id;
 * @apiParam {String="ASC","DESC"} [sortByPrice] 按照价格排序，从小到大-ASC,从大到小-DESC;
 * @apiSampleRequest /api/goods/
 */
router.get("/goods/", function(req, res) {
	let query = req.query;
	//取出空键值对
	for (let key in query) {
		if (!query[key]) {
			delete query[key]
		}
	}
	//拼接SQL
	function produceSQL({
		pageSize = 4,
		pageIndex = 1,
		sortByPrice = '',
		cate_1st = '',
		cate_2nd = '',
		cate_3rd = '',
	}) {
		let size = parseInt(pageSize);
		let count = size * (pageIndex - 1);
		let sql = `SELECT * FROM GOODS `
		if (cate_1st) {
			sql += `WHERE cate_1st = ${cate_1st}`;
		}
		if (cate_2nd) {
			sql += `WHERE cate_2nd = ${cate_2nd}`;
		}
		if (cate_3rd) {
			sql += `WHERE cate_3rd = ${cate_3rd}`;
		}
		sql += ` ORDER BY create_time DESC , price ${sortByPrice} LIMIT ${count},${size}`
		return sql;
	}
	db.query(produceSQL(req.query), [], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			data: results
		});
	});
});
/**
 * @api {get} /api/goods/detail/ 获取商品详情
 * @apiName /goods/detail/ 获取商品详情
 * @apiGroup Goods
 * 
 * @apiParam {Number} id 商品id;
 * 
 * @apiSampleRequest /api/goods/detail/
 */
router.get("/goods/detail/", function(req, res) {
	let sql = `SELECT * FROM GOODS WHERE id = ?`
	db.query(sql, [req.query.id], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			data: results[0]
		});
	});
});
/**
 * @api {post} /api/cart/add/ 添加商品至购物车
 * @apiName /cart/add/ 添加商品至购物车
 * @apiGroup Cart
 * 
 * @apiParam {Number} uid 用户id;
 * @apiParam {Number} gid 商品id;
 * @apiParam {Number} num 商品数量,不能超过库存;
 * 
 * @apiSampleRequest /api/cart/add/
 */
router.post('/cart/add/', function(req, res) {
	// 检查购物车是否已经有此商品
	let sql = `SELECT * FROM carts WHERE goods_id = ?`;
	db.query(sql, [req.body.gid], function(results, fields) {
		// 没有此商品,插入新纪录
		sql =
			`INSERT INTO carts ( uid , goods_id , num , create_time )
			VALUES ( ${req.body.uid} , ${req.body.gid} , ${req.body.num} ,CURRENT_TIMESTAMP())`;
		// 已有此商品，增加数量
		if (results.length > 0) {
			sql =
				`UPDATE carts SET num = num + ${req.body.num} , update_time = CURRENT_TIMESTAMP()  WHERE goods_id = ${req.body.gid}`;
		}
		db.query(sql, function(results, fields) {
			//成功
			res.json({
				status: true,
				msg: "success!"
			});
		});
	});
});
/**
 * @api {get} /api/cart/ 获取购物车列表
 * @apiName /cart/ 获取购物车列表
 * @apiGroup Cart
 * 
 * @apiParam {Number} uid 用户id;
 * 
 * @apiSampleRequest /api/cart/
 */
router.get('/cart/', function(req, res) {
	let sql =
		`SELECT goods.id , goods.img_md AS img , goods.name , goods.price , carts.num 
		FROM carts JOIN goods 
		WHERE carts.uid = ? AND carts.goods_id = goods.id`;
	db.query(sql, [req.query.uid], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
			data: results
		});
	});
});
/**
 * @api {post} /api/cart/delete/ 购物车删除商品
 * @apiName /cart/delete/ 购物车删除商品
 * @apiGroup Cart
 * 
 * @apiParam {Number} id 购物车条目id;
 * 
 * @apiSampleRequest /api/cart/delete/
 */
router.post('/cart/delete/', function(req, res) {
	let sql = `DELETE FROM carts WHERE id = ?`;
	db.query(sql, [req.body.id], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
		});
	});
})
/**
 * @api {post} /api/cart/increase/ 购物车增加商品数量
 * @apiDescription 增加商品数量，后台查询库存，注意提示库存不足
 * @apiName /cart/increase/ 购物车增加商品数量
 * @apiGroup Cart
 * 
 * @apiParam {Number} id 购物车条目id;
 * @apiParam {Number} gid 商品id;
 * @apiParam {Number} num 商品数量;
 * 
 * @apiSampleRequest /api/cart/increase/
 */
router.post('/cart/increase/', function(req, res) {
	// 检查库存
	let sql = `SELECT num FROM carts WHERE id = ?;
	SELECT inventory FROM goods WHERE id = ?`;
	db.query(sql, [req.body.id, req.body.gid], function(results, fields) {
		let isEmpty = results[1][0].inventory - results[0][0].num - req.body.num >= 0 ? false : true;
		if (isEmpty) {
			res.json({
				status: false,
				msg: "库存不足!"
			});
			return;
		}
		let sql = `UPDATE carts SET num = num + ? , update_time = CURRENT_TIMESTAMP()  WHERE id = ?`;
		db.query(sql, [req.body.num, req.body.id], function(results, fields) {
			//成功
			res.json({
				status: true,
				msg: "success!",
			});
		});
	});

})
/**
 * @api {post} /api/cart/decrease/ 购物车减少商品数量
 * @apiDescription 减少商品数量，前台注意约束num，商品数量>=1
 * @apiName /cart/decrease/ 购物车减少商品数量
 * @apiGroup Cart
 * 
 * @apiParam {Number} id 购物车条目id;
 * @apiParam {Number} num 商品数量;
 * 
 * @apiSampleRequest /api/cart/decrease/
 */
router.post('/cart/decrease/', function(req, res) {
	let sql = `UPDATE carts SET num = num - ? , update_time = CURRENT_TIMESTAMP()  WHERE id = ?`;
	db.query(sql, [req.body.num, req.body.id], function(results, fields) {
		//成功
		res.json({
			status: true,
			msg: "success!",
		});
	});
})
/**
 * @api {post} /api/order/create/ 结算按钮-下订单
 * @apiDescription 在购物车页面，结算按钮意味着将购物车中的商品转移到订单中，生成新的订单，称之为下单操作
 * @apiName CreateOrder
 * @apiGroup Order
 * 
 * @apiParam {Number} uid 用户id;
 * @apiParam {Object[]} goodsList 商品数组;
 * @apiParam (goodsList) {Number} id 商品id;
 * @apiParam (goodsList) {Number} num 商品数量;
 * @apiParam (goodsList) {Number} price 商品价格;
 * 
 * @apiSampleRequest /api/order/create/
 */
router.post('/order/create/', function(req, res) {
	let queryGid = [];
	let list = req.body.goodsList;
	list.forEach(function(item) {
		queryGid.push(item.id);
	});
	let sql = `SELECT inventory FROM goods WHERE id IN (?)`;
	// 检查库存
	db.query(sql, [queryGid], function(results, fields) {
		// every碰到第一个为false的，即终止执行
		let isAllPassed = results.every(function(item, index) {
			let isPassed = item.inventory >= list[index].num;
			if (isPassed == false) {
				res.json({
					status: false,
					msg: `id为${list[index].id}的商品，库存不足!`,
					data:{
						id:list[index].id
					}
				});
			}
			return isPassed;
		});
		// 库存不足,终止执行
		if(isAllPassed==false){
			return;
		}
		// 库存充足
		let sql=``
		
	});

	// 	db.query(sql, [req.body.gid], function(results, fields) {
	// 		// 检查库存
	// 		let isEmpty = results[0].inventory - req.body.num >= 0 ? false : true;
	// 		if (isEmpty) {
	// 			res.json({
	// 				status: false,
	// 				msg: "库存不足!"
	// 			});
	// 			return;
	// 		}
	// 		// 检查购物车是否已经有此商品
	// 		let sql = `SELECT * FROM carts WHERE goods_id = ?`;
	// 		db.query(sql, [req.body.gid], function(results, fields) {
	// 			let sql = `UPDATE goods SET  inventory = inventory - ${req.body.num} WHERE id = ${req.body.gid};`
	// 			// 没有此商品,插入新纪录
	// 			if (results.length == 0) {
	// 				sql = sql +
	// 					`INSERT INTO carts (uid,goods_id,num,create_time)
	// 				VALUES (${req.body.uid},${req.body.gid},${req.body.num},CURRENT_TIMESTAMP())`;
	// 			} else {
	// 				// 已有此商品，增加数量
	// 				sql = sql + `UPDATE carts SET num = num + ${req.body.num}`;
	// 			}
	// 			// 更新库存，修改购物车
	// 			db.query(sql, function(results, fields) {
	// 				//成功
	// 				res.json({
	// 					status: true,
	// 					msg: "success!"
	// 				});
	// 			});
	// 		});
	// 
	// 	});

});
module.exports = router;
