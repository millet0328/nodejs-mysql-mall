var express = require('express');
var router = express.Router();
// 数据结构
var models = require("../models/models");
var Goods = models.Goods;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//获取商品列表--分页
/*
 * pageSize 一个页有多少个商品  4
 * pageIndex  skip pageSize*(pageIndex-1)
 * pageIndex 第几页
 * sort 排序
 * class 分类
 */
router.get("/goods/", function(req, res) {
    var size = parseInt(req.query.pageSize);
    var count = size * (req.query.pageIndex - 1)
    Goods
        .find({})
        .skip(count)
        .limit(size)
        .exec(function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
            if (docs.length == 0) {
                res.json({
                    status: false,
                    msg: "暂无商品！"
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

//获取商品详情
/*
 id 商品id
 */
router.get("/goods/detail/", function(req, res) {
    Goods
        .findOne(req.query)
        .populate('category_1st')
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            if (!doc) {
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