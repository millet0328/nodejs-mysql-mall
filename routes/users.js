var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');
/**
 * @api {post} /users/register/ 注册
 * @apiName register 注册
 * @apiGroup User
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiSampleRequest /users/register
 */
router.post('/register/', function(req, res) {
	// 查询账户是否存在
	let sql = `SELECT * FROM USERS WHERE username = ?`
	db.query(sql, [req.body.username], function(results, fields) {
		if(results.length) {
			res.json({
				status: false,
				msg: "账号已经存在！"
			});
			return false;
		}
		let sql = `INSERT INTO USERS (username,password) VALUES (?,?)`
		db.query(sql, [req.body.username, req.body.password], function(results, fields) {
			// 存储成功
			res.json({
				status: true,
				msg: "注册成功！",
				data: {
					id: results.insertId
				}
			});
		})
	});
});
/**
 * @api {post} /users/login/ 登录
 * @apiName login 登录
 * @apiGroup User
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiSampleRequest /users/login
 */

router.post('/login/', function(req, res) {
	let sql = `SELECT * FROM USERS WHERE username = ? AND password = ? `;
	db.query(sql, [req.body.username, req.body.password], function(results, fields) {
		// 账号密码错误
		if(!results.length) {
			res.json({
				status: false,
				msg: "账号或者密码错误！"
			});
			return false;
		}
		// 登录成功
		res.json({
			status: true,
			msg: "登录成功！",
			data: {
				id: results[0].id
			}
		});
	});
});

//获取个人资料
/*
    _id:账户ID
*/
router.get("/getInfo/", function(req, res) {
	//查询账户数据
	User
		.findOne(req.query)
		.select("nickname sex avatar")
		.exec(function(err, user) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(user);
			if(!user) {
				res.json({
					status: false,
					msg: "查询账户信息失败!"
				});
				return;
			}
			res.json({
				status: true,
				data: user
			});

		});
});
//更新资料
router.post("/updateInfo/", function(req, res) {
	//修改数据
	User.update({
		account: req.body.account
	}, req.body, function(err, writeOpResult) {
		if(err) {
			console.log(err);
			return;
		}
		if(writeOpResult.ok != 1) {
			res.json({
				status: false,
				msg: "修改失败!"
			});
			return;
		}
		res.json({
			status: true,
			msg: "修改成功！"
		});
	});
});
// 添加收货地址
/*
    uid: 账户ID,
    name: 收货人姓名,
    tel: 电话,
    province: 省,
    city: 市,
    area:区,
    street: 街道,
    isDefault: 是否默认
*/
router.post("/address/insert", function(req, res) {
	//账户id
	User.findOne({
		_id: req.body.uid
	}, function(err, user) {
		if(err) {
			console.log(err);
			return;
		}
		//账号不存在
		if(!user) {
			res.json({
				status: false,
				msg: "账户信息不存在！"
			});
			return false;
		}
		var address = new Address(req.body);
		//是否设置默认收货地址
		if(req.body.isDefault == "true") {
			Address.update({
				uid: user._id
			}, {
				$set: {
					isDefault: false
				}
			}, {
				multi: true
			}, function(err, writeOpResult) {
				if(err) {
					console.log(err);
					return;
				}
				console.log(writeOpResult);
			});
		}
		address.save(function(err, doc) {
			if(err) {
				console.log(err);
				return;
			}
			res.json({
				status: true,
				msg: "添加收货地址成功！"
			});
		});

	});
});

//获取收货地址列表
/*
 * _id:账户id
 */
router.get("/getAddress/", function(req, res) {
	Address.find({
		uid: req.query._id
	}, function(err, docs) {
		if(err) {
			console.log(err);
			return;
		}
		if(!docs.length) {
			res.json({
				status: false,
				msg: "暂无收货地址！"
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
//根据id获取收货地址详情
router.get("/getAddressById/", function(req, res) {
	Address.findOne(req.query, function(err, doc) {
		if(err) {
			console.log(err);
			return;
		}
		if(!doc) {
			res.json({
				status: false,
				msg: "没有地址信息！"
			});
			return;
		}
		res.json({
			status: true,
			msg: "查找成功！",
			data: doc
		});
	});
})

module.exports = router;