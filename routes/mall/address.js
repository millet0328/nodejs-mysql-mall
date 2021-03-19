const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');
/**
 * @api {post} /api/address/add 添加收货地址
 * @apiName addressAdd
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiParam {String} name 收货人姓名.
 * @apiParam {String} tel 电话.
 * @apiParam {Number} province_id 省份id.
 * @apiParam {Number} city_id 市id.
 * @apiParam {Number} county_id 区县id.
 * @apiParam {Number} town_id 街道(镇)id.
 * @apiParam {String} street 详细地址.
 * @apiParam {String} code 邮编.
 * @apiParam {Number=1,0} isDefault 是否默认 1-默认,0-否.
 *
 * @apiSampleRequest /api/address/add
 */
router.post('/add', function (req, res) {
    let sql;
    let { name, tel, province_id, city_id, county_id, town_id, street, code, isDefault } = req.body;
    let { id } = req.user;
    if (isDefault == '1') {
        sql = `UPDATE address SET isDefault = 0 WHERE uid = '${id}';
		INSERT INTO address(uid, name, tel, province_id, city_id, county_id, town_id, street, code, isDefault) VALUES(?,?,?,?,?,?,?,?,?,?);`
    } else {
        sql = `INSERT INTO address(uid, name, tel, province_id, city_id, county_id, town_id, street, code, isDefault) VALUES(?,?,?,?,?,?,?,?,?,?)`
    }
    db.query(sql, [id, name, tel, province_id, city_id, county_id, town_id, street, code, isDefault], function (results) {
        res.json({
            status: true,
            msg: "添加成功！"
        });
    });
});
/**
 * @api {post} /api/address/remove 删除收货地址
 * @apiName addressDelete
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiParam {Number} id 收货地址id.
 *
 * @apiSampleRequest /api/address/remove
 */
router.post("/remove", function (req, res) {
    let { id } = req.body;
    var sql = `DELETE FROM address WHERE id = ? `
    db.query(sql, [id], function (results) {
        res.json({
            status: true,
            data: results,
            msg: "删除成功！"
        });
    })
})
/**
 * @api {post} /api/address/edit 修改收货地址
 * @apiName addressUpdate
 * @apiGroup Address
 * @apiPermission user

 * @apiParam {Number} id 收货地址id.
 * @apiParam {String} name 收货人姓名.
 * @apiParam {String} tel 电话.
 * @apiParam {Number} province_id 省份id.
 * @apiParam {Number} city_id 市id.
 * @apiParam {Number} county_id 区县id.
 * @apiParam {Number} town_id 街道(镇)id.
 * @apiParam {String} street 详细地址.
 * @apiParam {String} code 邮编.
 * @apiParam {Number=1,0} isDefault 是否默认.1-默认,0-否.
 *
 * @apiSampleRequest /api/address/edit
 */
router.post("/edit", function (req, res) {
    let sql;
    let { id, name, tel, province_id, city_id, county_id, town_id, street, code, isDefault } = req.body;
    let { id:uid } = req.user;
    if (isDefault == '1') {
        sql = `UPDATE address SET isDefault = 0 WHERE uid = '${uid}';
		UPDATE address SET name = ?, tel = ?, province_id = ?, city_id = ?, county_id = ?, town_id = ?, street = ?, code = ?, isDefault = ? WHERE id = ?;`
    } else {
        sql = `UPDATE address SET name = ?, tel = ?, province_id = ?, city_id = ?, county_id = ?, town_id = ?, street = ?, code = ?, isDefault = ? WHERE id = ?`
    }
    db.query(sql, [name, tel, province_id, city_id, county_id, town_id, street, code, isDefault, id], function (results) {
        res.json({
            status: true,
            msg: "修改成功！"
        });
    });
});
/**
 * @api {get} /api/address/list 获取收货地址列表
 * @apiName addressList
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiSampleRequest /api/address/list
 */
router.get('/list', function (req, res) {
    let { id } = req.user;
    var sql = 'SELECT a.*, p.`name` AS province_name, c.`name` AS city_name, ct.`name` AS county_name, t.`name` AS town_name FROM address a JOIN province p ON p.province_id = a.province_id JOIN city c ON c.city_id = a.city_id JOIN county ct ON ct.county_id = a.county_id JOIN town t ON t.town_id = a.town_id WHERE uid = ?'
    db.query(sql, [id], function (results) {
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
 * @api {get} /api/address 根据id获取收货地址详情
 * @apiName addressDetail
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiParam {Number} id 收货地址id.
 *
 * @apiSampleRequest /api/address
 */
router.get("/", function (req, res) {
    let { id } = req.query;
    var sql = 'SELECT a.*, p.`name` AS province_name, c.`name` AS city_name, ct.`name` AS county_name, t.`name` AS town_name FROM address a JOIN province p ON p.province_id = a.province_id JOIN city c ON c.city_id = a.city_id JOIN county ct ON ct.county_id = a.county_id JOIN town t ON t.town_id = a.town_id WHERE id = ? ';
    db.query(sql, [id], function (results) {
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
});

module.exports = router;
