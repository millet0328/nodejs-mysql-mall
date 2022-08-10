var express = require('express');
var router = express.Router();
// JSON Web Token
var jwt = require("jsonwebtoken");
// 数据库
let pool = require('../../config/mysql');

/**
 * @apiDefine Authorization
 * @apiHeader {String} Authorization 需在请求headers中设置Authorization: `Bearer ${token}`，小程序登录成功code换取的token。
 */

/**
 * @apiDefine UserLoginResponse
 * @apiSuccess { Boolean } status 请求状态.
 * @apiSuccess { String } msg 请求结果信息.
 * @apiSuccess { Object } data 请求结果数据.
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
 * @api {post} /user/register 注册
 * @apiDescription 注册成功， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`,所有请求都必须携带token;
 * @apiName register
 * @apiGroup User
 * @apiPermission user
 *
 * @apiBody {String} username 用户账户名.
 * @apiBody {String} password 用户密码.
 * @apiBody { String } sex 性别.
 * @apiBody { String } tel 手机号码.
 *
 * @apiUse UserLoginResponse
 *
 * @apiSampleRequest /user/register
 */
router.post('/register', async function (req, res) {
    let { username, password, sex, tel } = req.body;
    // 查询账户是否存在
    let select_sql = `SELECT * FROM user WHERE username = ?`;
    let [users] = await pool.query(select_sql, [username]);
    if (users.length) {
        res.json({
            status: false,
            msg: "账号已经存在！"
        });
        return false;
    }
    // 默认头像
    let defaultAvatar = process.env.server + '/images/avatar/default.jpg';
    // 创建账户，昵称默认为用户名
    let insert_sql = `INSERT INTO user (username,password,nickname,sex,avatar,tel,create_time) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP())`;
    let [{ insertId, affectedRows: insert_affected_rows }] = await pool.query(insert_sql, [username, password, username, sex, defaultAvatar, tel]);
    if (insert_affected_rows === 0) {
        res.json({ status: false, msg: "注册失败！" });
        return;
    }
    // 生成token
    let token = jwt.sign({ id: insertId, }, 'secret', { expiresIn: '4h' });
    // 注册成功
    res.json({
        status: true,
        msg: "注册成功！",
        data: {
            token,
            id: insertId,
        }
    });
});

/**
 * @api {post} /user/login 登录
 * @apiDescription 登录成功， 返回token, 请在头部headers中设置Authorization: `Bearer ${token}`, 所有请求都必须携带token;
 * @apiName login
 * @apiGroup User
 * @apiPermission user
 *
 * @apiBody {String} username 用户账户名.
 * @apiBody {String} password 用户密码.
 *
 * @apiUse UserLoginResponse
 *
 * @apiSampleRequest /user/login
 */

router.post('/login', async function (req, res) {
    let { username, password } = req.body;
    // 查询账号密码
    let select_sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
    let [users] = await pool.query(select_sql, [username, password]);
    // 账号密码错误
    if (!users.length) {
        res.json({
            status: false,
            msg: "账号或者密码错误！"
        });
        return false;
    }
    let { id } = users[0];
    // 登录成功,生成token
    let token = jwt.sign({ id }, 'secret', { expiresIn: '4h' });
    res.json({
        status: true,
        msg: "登录成功！",
        data: { token, id, }
    });
});

/**
 * @api {get} /user/info 获取个人资料
 * @apiName UserInfo
 * @apiGroup User
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiSampleRequest /user/info
 */
router.get("/info", async function (req, res) {
    let { id } = req.user;
    //查询账户数据
    let select_sql = `SELECT id,username,nickname,sex,avatar,tel FROM user WHERE id = ?`;
    let [[user]] = await pool.query(select_sql, [id]);
    // 获取成功
    res.json({
        status: true,
        msg: "获取成功！",
        data: user
    });
});

/**
 * @api { post } /user/edit 更新个人资料
 * @apiName infoUpdate
 * @apiGroup User
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiBody {String} nickname 昵称.
 * @apiBody {String} sex 性别.
 * @apiBody {String} avatar 头像URL地址.
 * @apiBody { String } tel 手机号码.
 *
 * @apiSampleRequest /user/edit
 */
router.post("/edit", async function (req, res) {
    let { nickname, sex, avatar, tel } = req.body;
    let { id } = req.user;
    let sql = `UPDATE user SET nickname = ?,sex = ?,avatar = ? ,tel = ? WHERE id = ?`;
    let [{ affectedRows }] = await pool.query(sql, [nickname, sex, avatar, tel, id]);
    // 修改失败
    if (affectedRows === 0) {
        res.json({
            status: false,
            msg: "修改失败！"
        });
        return;
    }
    // 修改成功
    res.json({
        status: true,
        msg: "修改成功！"
    });
});

module.exports = router;
