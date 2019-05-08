var express = require('express');
var router = express.Router();
var request = require('request');
// JSON Web Token
var jwt = require("jsonwebtoken");
// 数据库
let db = require('../config/mysql');
/**
 * @apiDefine SuccessResponse
 * @apiSuccess { Boolean } status 请求状态.
 * @apiSuccess { String } msg 请求结果信息.
 * @apiSuccess { Object } data 请求结果信息.
 * @apiSuccess { String } data.token 注册成功之后返回的token.
 * @apiSuccessExample { json } 200返回的JSON:
 *  HTTP / 1.1 200 OK
 *  {
 *      "status": true,
 *      "msg": "成功",
 *      "data":{
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiIxIiwiaWF0IjoxNTU3MzM1Mzk3LCJleHAiOjE1NTczNDI1OTd9.vnauDCSHdDXaZyvTjNOz0ezpiO-UACbG-oHg_v76URE"
 *      }
 *  }
 */

/**
 * @api {post} /api/user/register/ 注册
 * @apiDescription 注册成功， 返回token, 请在头部headers中设置Authorization: "Bearer ${token}",所有请求都必须携带token;
 * @apiName register
 * @apiGroup User
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiUse SuccessResponse
 * 
 * @apiSampleRequest /api/user/register
 */
router.post('/user/register/', function(req, res) {
    // 查询账户是否存在
    let sql = `SELECT * FROM USERS WHERE username = ?`
    db.query(sql, [req.body.username], function(results, fields) {
        if (results.length) {
            res.json({
                status: false,
                msg: "账号已经存在！"
            });
            return false;
        }
        let sql = `INSERT INTO USERS (username,password) VALUES (?,?)`
        db.query(sql, [req.body.username, req.body.password], function(results, fields) {
            let payload = {
                id: results.insertId,
                username: req.body.username
            }
            // 生成token
            let token = jwt.sign(payload, 'secret', { expiresIn: '2h' });
            // 存储成功
            res.json({
                status: true,
                msg: "注册成功！",
                data: {
                    token
                }
            });
        })
    });
});
/**
 * @api {post} /api/user/login/ 登录
 * @apiDescription 登录成功， 返回token, 请在头部headers中设置Authorization: "Bearer ${token}", 所有请求都必须携带token;
 * @apiName login
 * @apiGroup User
 * 
 * @apiParam {String} username 用户账户名.
 * @apiParam {String} password 用户密码.
 * 
 * @apiUse SuccessResponse
 * 
 * @apiSampleRequest /api/user/login
 */

router.post('/user/login/', function(req, res) {
    let sql = `SELECT * FROM USERS WHERE username = ? AND password = ? `;
    db.query(sql, [req.body.username, req.body.password], function(results, fields) {
        // 账号密码错误
        if (!results.length) {
            res.json({
                status: false,
                msg: "账号或者密码错误！"
            });
            return false;
        }
        // 登录成功
        let payload = {
            id: results[0].id,
            username: results[0].username
        }
        // 生成token
        let token = jwt.sign(payload, 'secret', { expiresIn: '2h' });
        res.json({
            status: true,
            msg: "登录成功！",
            data: {
                token
            }
        });
    });
});
/**
 * @api {get} /api/user/info/ 获取个人资料
 * @apiName /user/info
 * @apiGroup User
 * 
 * @apiParam {Number} uid 用户id.
 * 
 * @apiSampleRequest /api/user/info
 */
router.get("/user/info/", function(req, res) {
    //查询账户数据
    let sql = `SELECT username,nickname,sex,avatar FROM USERS WHERE id = ?`;
    db.query(sql, [req.query.uid], function(results, fields) {
        if (!results.length) {
            res.json({
                status: false,
                msg: "获取失败！"
            });
            return false;
        }
        // 获取成功
        res.json({
            status: true,
            msg: "获取成功！",
            data: results[0]
        });
    })
});
/**
 * @api { post } /api/user/info/update/ 更新个人资料
 * @apiName /info/update
 * @apiGroup User
 * 
 * @apiParam {Number} uid 用户id.
 * @apiParam {String} nickname 昵称.
 * @apiParam {String} sex 性别.
 * @apiParam {String} avatar 头像.
 * 
 * @apiSampleRequest /api/user/info/update/
 */
router.post("/user/info/update/", function(req, res) {
    let sql = `UPDATE users SET nickname = ?,sex = ?,avatar = ? WHERE id = ?`
    db.query(sql, [req.body.nickname, req.body.sex, req.body.avatar, req.body.uid], function(results, fields) {
        res.json({
            status: true,
            msg: "修改成功！"
        });
    });
});

/**
 * @api {post} /api/address/add/ 添加收货地址
 * @apiName /address/add/
 * @apiGroup Address
 * 
 * @apiParam {Number} uid 用户id.
 * @apiParam {String} name 收货人姓名.
 * @apiParam {String} tel 电话.
 * @apiParam {String} province 省.
 * @apiParam {String} city 市.
 * @apiParam {String} area 区.
 * @apiParam {String} street 街道.
 * @apiParam {String} [code] 邮编.
 * @apiParam {Number} isDefault 是否默认 1-默认,0-否.
 * 
 * @apiSampleRequest /api/address/add/
 */
router.post('/address/add', function(req, res) {
    let sql;
    let isDefault = req.body.isDefault;
    if (isDefault == '1') {
        sql =
            `
		UPDATE addresses SET isDefault = 0 WHERE uid = ${req.body.uid};
		INSERT INTO addresses(uid,name,tel,province,city,area,street,code,isDefault) VALUES(?,?,?,?,?,?,?,?,?);
		`
    } else {
        sql = `INSERT INTO addresses(uid,name,tel,province,city,area,street,code,isDefault) VALUES(?,?,?,?,?,?,?,?,?)`
    }
    db.query(sql, [req.body.uid, req.body.name, req.body.tel, req.body.province, req.body.city, req.body.area, req.body.street,
        req.body.code, req.body.isDefault
    ], function(results, fields) {
        res.json({
            status: true,
            msg: "添加成功！"
        });
    });
});
/**
 * @api {post} /api/address/delete/ 删除收货地址
 * @apiName /address/delete/
 * @apiGroup Address
 * 
 * @apiParam {Number} id 收货地址id.
 * 
 * @apiSampleRequest /api/address/delete/
 */
router.post("/address/delete/", function(req, res) {
    var sql = `DELETE FROM addresses WHERE id = ? `
    db.query(sql, [req.body.id], function(results, fields) {
        res.json({
            status: true,
            data: results,
            msg: "删除成功！"
        });
    })
})
/**
 * @api {post} /api/address/update/ 修改收货地址
 * @apiName /address/update/
 * @apiGroup Address
 * 
 * @apiParam {Number} id 收货地址id.
 * @apiParam {Number} uid 用户id.
 * @apiParam {String} name 收货人姓名.
 * @apiParam {String} tel 电话.
 * @apiParam {String} province 省.
 * @apiParam {String} city 市.
 * @apiParam {String} area 区.
 * @apiParam {String} street 街道.
 * @apiParam {String} [code] 邮编.
 * @apiParam {Number} isDefault 是否默认.1-默认,0-否.
 * 
 * @apiSampleRequest /api/address/update/
 */
router.post("/address/update/", function(req, res) {
    let sql;
    let isDefault = req.body.isDefault;
    if (isDefault == '1') {
        sql =
            `
		UPDATE addresses SET isDefault = 0 WHERE uid = ${req.body.uid};
		UPDATE addresses SET uid = ?,name = ?,tel = ?,province = ?,city = ?,area = ?,street = ?,code = ?,isDefault = ? WHERE id = ?;
		`
    } else {
        sql =
            `UPDATE addresses SET uid = ?,name = ?,tel = ?,province = ?,city = ?,area = ?,street = ?,code = ?,isDefault = ? WHERE id = ?`
    }
    db.query(sql, [req.body.uid, req.body.name, req.body.tel, req.body.province, req.body.city, req.body.area, req.body.street,
        req.body.code, req.body.isDefault, req.body.id
    ], function(results, fields) {
        res.json({
            status: true,
            msg: "修改成功！"
        });
    });
})
/**
 * @api {get} /api/address/list/ 获取收货地址列表
 * @apiName /address/list/
 * @apiGroup Address
 * 
 * @apiParam {Number} uid 用户id.
 * 
 * @apiSampleRequest /api/address/list/
 */
router.get('/address/list', function(req, res) {
    var sql = `SELECT * FROM addresses WHERE uid = ? `
    db.query(sql, [req.query.uid], function(results, fields) {
        if (!results.length) {
            res.json({
                status: false,
                msg: "暂无收货地址！"
            });
            return false;
        }
        res.json({
            status: true,
            data: results,
            msg: "获取成功！"
        });
    })
});
/**
 * @api {get} /api/address/detail/ 根据id获取收货地址详情
 * @apiName /address/detail/
 * @apiGroup Address
 * 
 * @apiParam {Number} id 收货地址id.
 * 
 * @apiSampleRequest /api/address/detail/
 */
router.get("/address/detail/", function(req, res) {
    var sql = `SELECT * FROM addresses WHERE id = ? `
    db.query(sql, [req.query.id], function(results, fields) {
        if (!results.length) {
            res.json({
                status: false,
                msg: "暂无收货地址信息！"
            });
            return false;
        }
        res.json({
            status: true,
            data: results[0],
            msg: "获取成功！"
        });
    })
})

module.exports = router;