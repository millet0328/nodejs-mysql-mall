const express = require('express');
const router = express.Router();
// 数据库
let db = require('../../config/mysql');

/**
 * @api {post} /api/collection/add 添加商品至我的收藏
 * @apiName CollectionAdd
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiParam {Number} id 商品id.
 *
 * @apiSampleRequest /api/collection/add
 */
router.post("/add", function (req, res) {
    let { id } = req.body;
    let { id: uid } = req.user;
    let sql = 'INSERT INTO collection ( uid, goods_id ) VALUES (?,?)';
    db.query(sql, [uid, id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
        });
    });
});

/**
 * @api {post} /api/collection/remove 取消收藏的商品
 * @apiName CollectionRemove
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiParam {Number} id 商品id.
 *
 * @apiSampleRequest /api/collection/remove
 */
router.post("/remove", function (req, res) {
    let { id } = req.body;
    let { id: uid } = req.user;
    let sql = 'DELETE FROM collection WHERE uid = ? and goods_id = ?';
    db.query(sql, [uid, id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
        });
    });
});

/**
 * @api {get} /api/collection/list 获取所有收藏的商品
 * @apiName CollectionList
 * @apiGroup Collection
 * @apiPermission user
 *
 * @apiSuccess {Number} id 收藏条目id.
 * @apiSuccess {Number} goods_id 商品id.
 * @apiSuccess {String} name 商品名称.
 * @apiSuccess {String} hotPoint 卖点.
 * @apiSuccess {Number} price 价格.
 * @apiSuccess {Number} marketPrice 市场价格.
 * @apiSuccess {String} img_md 商品图片.
 *
 * @apiSampleRequest /api/collection/list
 */
router.get("/list", function (req, res) {
    let { id } = req.user;
    let sql = 'SELECT c.id, c.goods_id, g.name, g.hotPoint, g.price, g.marketPrice, g.img_md FROM collection c JOIN goods g ON c.goods_id = g.id WHERE uid = ?';
    db.query(sql, [id], function (results) {
        //成功
        res.json({
            status: true,
            msg: "success!",
            data: results,
        });
    });
});

module.exports = router;