var express = require('express');
var router = express.Router();
// JSON Web Token
var jwt = require("jsonwebtoken");
// 数据库
let db = require('../../config/mysql');
/**
 * @apiDefine UserLoginResponse
 * @apiSuccess { Boolean } status 请求状态.
 * @apiSuccess { String } msg 请求结果信息.
 * @apiSuccess { Object } data 请求结果信息.
 * @apiSuccess { String } data.token 成功之后返回的token.
 * @apiSuccess { String } data.id 用户uid.
 * 
 * @apiSuccessExample { json } 200返回的JSON:
 *  HTTP / 1.1 200 OK
 *  {
 *      "status": true,
 *      "msg": "成功",
 *      "data":{
 *          "id":5,
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiIxIiwiaWF0IjoxNTU3MzM1Mzk3LCJleHAiOjE1NTczNDI1OTd9.vnauDCSHdDXaZyvTjNOz0ezpiO-UACbG-oHg_v76URE"
 *      }
 *  }
 */

/**
 * @api {post} /api/user/register 注册
 * @apiDescription 注册成功， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`,所有请求都必须携带token;
 * @apiName register
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * @apiParam { String } sex 性别.
 * @apiParam { String } tel 手机号码.
 * 
 * @apiUse UserLoginResponse
 * 
 * @apiSampleRequest /api/user/register
 */
router.post('/register', function(req, res) {
	let { username, password, sex, tel } = req.body;
	// 查询账户是否存在
	let sql = `SELECT * FROM user WHERE username = ?`
	db.query(sql, [username], function(results) {
		if (results.length) {
			res.json({
				status: false,
				msg: "账号已经存在！"
			});
			return false;
		}
		let defaultAvatar = process.env.server + '/images/avatar/default.jpg';
		let sql =
			`INSERT INTO user (username,password,nickname,sex,avatar,tel,create_time) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
		db.query(sql, [username, password, username, sex, defaultAvatar, tel], function(results) {
			let { insertId } = results;
			// 生成token
			let token = jwt.sign({ id: insertId, }, 'secret', {
				expiresIn: '4h'
			});
			// 存储成功
			res.json({
				status: true,
				msg: "注册成功！",
				data: {
					token,
					id: insertId,
				}
			});
		});
	});
});

/**
 * @api {post} /api/user/login 登录
 * @apiDescription 登录成功， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`, 所有请求都必须携带token;
 * @apiName login
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiUse UserLoginResponse
 * 
 * @apiSampleRequest /api/user/login
 */

router.post('/login', function(req, res) {
	let { username, password } = req.body;
	let sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
	db.query(sql, [username, password], function(results) {
		// 账号密码错误
		if (!results.length) {
			res.json({
				status: false,
				msg: "账号或者密码错误！"
			});
			return false;
		}
		let { id } = results[0];
		// 登录成功,生成token
		let token = jwt.sign({ id }, 'secret', {
			expiresIn: '4h'
		});
		res.json({
			status: true,
			msg: "登录成功！",
			data: {
				token,
				id,
			}
		});
	});
});

/**
 * @api {get} /api/user/info 获取个人资料
 * @apiName UserInfo
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiSampleRequest /api/user/info
 */
router.get("/info", function(req, res) {
	let { id } = req.user;
	//查询账户数据
	let sql = `SELECT id,username,nickname,sex,avatar,tel FROM user WHERE id = ?`;
	db.query(sql, [id], function(results) {
		// 获取成功
		res.json({
			status: true,
			msg: "获取成功！",
			data: results[0]
		});
	})
});

/**
 * @api { post } /api/user/edit 更新个人资料
 * @apiName infoUpdate
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiParam {String} nickname 昵称.
 * @apiParam {String} sex 性别.
 * @apiParam {String} avatar 头像.
 * @apiParam { String } tel 手机号码.
 * 
 * @apiSampleRequest /api/user/edit
 */
router.post("/edit", function(req, res) {
	let { nickname, sex, avatar, tel } = req.body;
	let { id } = req.user;
	let sql = `UPDATE user SET nickname = ?,sex = ?,avatar = ? ,tel = ? WHERE id = ?`;
	db.query(sql, [nickname, sex, avatar, tel, id], function(results) {
		res.json({
			status: true,
			msg: "修改成功！"
		});
	});
});

module.exports = router;
