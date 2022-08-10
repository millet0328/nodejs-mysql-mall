const express = require('express');
const router = express.Router();
// 数据库
let pool = require('../../config/mysql');

/**
 * @apiDefine Authorization
 * @apiHeader {String} Authorization 需在请求headers中设置Authorization: `Bearer ${token}`，小程序登录成功code换取的token。
 */

/**
 * @api {post} /cart/add 添加商品至购物车
 * @apiName AddCart
 * @apiGroup Cart
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiBody {Number} gid 商品id;
 * @apiBody {Number} num 商品数量,不能超过库存;
 *
 * @apiSampleRequest /cart/add
 */
router.post('/add', async function (req, res) {
	let { gid, num } = req.body;
	let { id:uid } = req.user;
	// 检查购物车是否已经有此商品
	let select_sql = `SELECT * FROM cart WHERE goods_id = ? AND uid = ?`;
	let [results] = await pool.query(select_sql, [gid, uid]);

	// 没有此商品,插入新纪录
	if (results.length <= 0) {
		let insert_sql = `INSERT INTO cart ( uid , goods_id , goods_num , create_time ) VALUES ( ?, ?, ?,CURRENT_TIMESTAMP())`;
		let [{ affectedRows }] = await pool.query(insert_sql, [uid, gid, num]);
		if (affectedRows === 0) {
			res.json({
				status: false,
				msg: "添加失败!"
			});
			return;
		}
	}
	// 已有此商品，增加数量
	if (results.length > 0) {
		let update_sql = `UPDATE cart SET goods_num = goods_num + ? WHERE goods_id = ? AND uid = ?`;
		let [{ affectedRows }] = await pool.query(update_sql, [num, gid, uid]);
		if (affectedRows === 0) {
			res.json({
				status: false,
				msg: "添加失败!"
			});
			return;
		}
	}
	//成功
	res.json({
		status: true,
		msg: "添加成功!"
	});
});

/**
 * @api {get} /cart/list 获取购物车列表
 * @apiName CartList
 * @apiGroup Cart
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiQuery { Number } [pagesize=10] 每一页数量.
 * @apiQuery { Number } [pageindex=1] 第几页.
 *
 * @apiSampleRequest /cart/list
 */

router.get('/list', async function (req, res) {
	let { id } = req.user;
	let { pagesize = 10, pageindex = 1 } = req.query;
	// 计算偏移量
	pagesize = parseInt(pagesize);
	const offset = pagesize * (pageindex - 1);
	// 购物车商品
	let goods_sql = `SELECT c.id, c.goods_id, g.img_md AS img, g.name, g.price, c.goods_num FROM cart c JOIN goods g ON c.goods_id = g.id WHERE c.uid = ? LIMIT ? OFFSET ?`;
	let [goods] = await pool.query(goods_sql, [id, pagesize, offset]);
	// 计算总数
	let total_sql = `SELECT COUNT(*) as total FROM cart WHERE uid = ?`;
	let [total] = await pool.query(total_sql, [id]);
	//成功
	res.json({
		status: true,
		msg: "获取成功!",
		...total[0],
		data: goods,
	});
});
/**
 * @api {post} /cart/remove 购物车删除商品
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiBody {Number} id 购物车条目id;
 *
 * @apiSampleRequest /cart/remove
 */
router.post('/remove', async function (req, res) {
	let { id } = req.body;
	let sql = `DELETE FROM cart WHERE id = ?`;
	let [{ affectedRows }] = await pool.query(sql, [id]);
	// 删除失败
	if (affectedRows === 0) {
		res.json({
			status: false,
			msg: "删除失败!",
		});
		return;
	}
	// 删除成功
	res.json({
		status: true,
		msg: "删除成功!",
	});
});
/**
 * @api {post} /cart/increase 购物车增加商品数量
 * @apiDescription 增加商品数量，后台查询库存，注意提示库存不足
 * @apiName IncreaseCart
 * @apiGroup Cart
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiBody {Number} id 购物车条目id;
 * @apiBody {Number} gid 商品id;
 * @apiBody {Number{1-库存MAX}} [num=1] 增加的数量;
 *
 * @apiSampleRequest /cart/increase
 */
router.post('/increase', async function (req, res) {
	let { id, gid, num = 1 } = req.body;
	// 购物车商品数量
	let cart_sql = 'SELECT goods_num FROM cart WHERE id = ?';
	let [{ goods_num }] = await pool.query(cart_sql, [id]);
	// 商品库存
	let goods_sql = `SELECT inventory FROM goods WHERE id = ?`;
	let [{ inventory }] = await pool.query(goods_sql, [gid]);
	// 判断库存是否为空
	let isEmpty = inventory - goods_num - num < 0;
	if (isEmpty) {
		res.json({
			status: false,
			msg: "库存不足!"
		});
		return;
	}
	let update_sql = `UPDATE cart SET goods_num = goods_num + ? WHERE id = ?`;
	let [{ affectedRows }] = await pool.query(update_sql, [num, id]);
	// 更新失败
	if (affectedRows === 0) {
		res.json({
			status: false,
			msg: "增加失败!",
		});
		return;
	}
	// 更新成功
	res.json({
		status: true,
		msg: "增加成功!",
	});
});
/**
 * @api {post} /cart/decrease 购物车减少商品数量
 * @apiDescription 减少商品数量，前台注意约束num，商品数量>=1
 * @apiName DecreaseCart
 * @apiGroup Cart
 * @apiPermission user
 *
 * @apiUse Authorization
 *
 * @apiBody {Number} id 购物车条目id;
 * @apiBody {Number{1-库存MAX}} [num=1] 减少的数量;
 *
 * @apiSampleRequest /cart/decrease
 */
router.post('/decrease', async function (req, res) {
	let { id, num = 1 } = req.body;
	let sql = `UPDATE cart SET goods_num = goods_num - ? WHERE id = ?`;
	let [{ affectedRows }] = await pool.query(sql, [num, id]);
	// 更新失败
	if (affectedRows === 0) {
		res.json({
			status: false,
			msg: "减少失败!",
		});
		return;
	}
	// 更新成功
	res.json({
		status: true,
		msg: "减少成功!",
	});
});

module.exports = router;
