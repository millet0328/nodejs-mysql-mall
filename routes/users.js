var express = require('express');
var router = express.Router();
// 数据结构
var models = require("../models/models");

var User = models.User;
var Address = models.Address;

// 注册
router.post('/register/', function(req, res) {
    // 实例化
    var user = new User(req.body);
    // 查询账户是否存在
    User.findOne({
        account: req.body.account
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                status: false,
                msg: "注册失败！"
            });
            return;
        }
        // 如果账号已存在
        if (result) {
            res.json({
                status: false,
                msg: "账号已经存在！"
            });
            return;
        }
        // 如果账号不存在,执行注册
        // 储存数据
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    msg: "注册失败！"
                });
                return;
            }
            // 存储成功
            res.json({
                status: true,
                msg: "注册成功！"
            });
        });

    });

});
// 登录
router.post('/login/', function(req, res) {
    console.log(req.body);
    User.find(req.body, function(err, users) {
        if (err) {
            console.log(err);
            res.json({
                status: false,
                msg: "登录失败！"
            });
            return;
        }
        console.log(users);
        if (!users.length) {
            res.json({
                status: false,
                msg: "账号或者密码错误！"
            });
            return;
        }
        // 成功
        res.json({
            status: true,
            msg: "登录成功！"
        });

    });

});

//获取个人资料
router.get("/getInfo/", function(req, res) {
    //查询账户数据
    User
        .findOne(req.query)
        .select("nickname sex avatar")
        .exec(function(err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(user);
            if (!user) {
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
        if (err) {
            console.log(err);
            return;
        }
        if (writeOpResult.ok != 1) {
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

//添加收货地址
router.post("/insertAddress/", function(req, res) {
    //账户id
    User.findOne({
        account: req.body.account
    }, function(err, user) {
        if (err) {
            console.log(err);
            return;
        }
        req.body.uid = user._id;
        var address = new Address(req.body);
        //是否设置默认收货地址
        if (req.body.isDefault == "true") {
            Address.update({
                uid: user._id
            }, {
                $set: {
                    isDefault: false
                }
            }, {
                multi: true
            }, function(err, writeOpResult) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(writeOpResult);
            });
        }
        address.save(function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                status: true,
                msg: "添加收货地址成功！"
            });
        });
    })
});

//获取收货地址列表
router.get("/getAddress/", function(req, res) {
    Address.find({
        uid: req.query._id
    }, function(err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (!docs.length) {
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
    // User
    //     .findOne(req.query)
    //     .exec(function(err, user) {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }

    //     });
});
//根据id获取收货地址
router.get("/getAddressById/", function(req, res) {
    Address.findOne(req.query, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        if (!doc) {
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