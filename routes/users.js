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
 * @apiSuccess { String } data.id 用户uid.
 * @apiSuccess { String } data.role 用户角色id.
 * 
 * @apiSuccessExample { json } 200返回的JSON:
 *  HTTP / 1.1 200 OK
 *  {
 *      "status": true,
 *      "msg": "成功",
 *      "data":{
 *          "id":5,
 *          "role":3,
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
 * @apiParam {String} nickname 用户昵称.
 * @apiParam { String } sex 性别.
 * @apiParam { String } tel 手机号码.
 * 
 * @apiUse SuccessResponse
 * 
 * @apiSampleRequest /api/user/register
 */
router.post('/user/register', function(req, res) {
  let {username, password, nickname, sex, tel} = req.body;
  // 查询账户是否存在
  let sql = `SELECT * FROM USERS WHERE username = ?`
  db.query(sql, [username], function(results, fields) {
    if (results.length) {
      res.json({
        status: false,
        msg: "账号已经存在！"
      });
      return false;
    }
    let {pool} = db;
    pool.getConnection(function(err, connection) {
      if (err)
        throw err; // not connected!
      connection.beginTransaction(function(err) {
        if (err) {
          throw err;
        }
        let sql = `INSERT INTO USERS (username,password,nickname,sex,tel,create_time) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;
        connection.query(sql, [username, password, nickname, sex, tel], function(error, results, fields) {
          let {insertId, affectedRows} = results;
          if (error || affectedRows <= 0) {
            return connection.rollback(function() {
              throw error || `${affectedRows} rows changed!`;
            });
          }
          let sql = `INSERT INTO user_role (user_id,role_id) VALUES (?,3)`;
          connection.query(sql, [insertId], function(error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }
            connection.commit(function(err) {
              if (err) {
                return connection.rollback(function() {
                  throw err;
                });
              }
            });
            let payload = {
              id: insertId,
              username,
              role: 3,
            }
            // 生成token
            let token = jwt.sign(payload, 'secret', {
              expiresIn: '2h'
            });
            // 存储成功
            res.json({
              status: true,
              msg: "注册成功！",
              data: {
                token,
                id: insertId,
                role: 3
              }
            });
          });

        });
      });
    });


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

router.post('/user/login', function(req, res) {
  let {username, password} = req.body;
  let sql = `SELECT u.*,r.id AS role FROM USERS u LEFT JOIN user_role ur ON u.id = ur.user_id LEFT JOIN role r ON r.id = ur.role_id  WHERE username = ? AND password = ?`;
  db.query(sql, [username, password], function(results) {
    // 账号密码错误
    if (!results.length) {
      res.json({
        status: false,
        msg: "账号或者密码错误！"
      });
      return false;
    }
    let {id, role} = results[0];
    // 更新登陆时间，登陆次数
    let sql = `UPDATE users SET login_count = login_count + 1 WHERE id = ?;`
    db.query(sql, [results[0].id], function(response) {
      if (response.affectedRows > 0) {
        // 登录成功
        let payload = {
          id,
          username,
          role,
        }
        // 生成token
        let token = jwt.sign(payload, 'secret', {
          expiresIn: '2h'
        });
        res.json({
          status: true,
          msg: "登录成功！",
          data: {
            token,
            id,
            role,
          }
        });
      }
    });

  });
});
/**
 * @api {get} /api/role/list 获取角色列表
 * @apiName RoleList
 * @apiGroup Role
 * @apiPermission admin
 * 
 * @apiSampleRequest /api/role/list
 */
router.get('/role/list', function(req, res) {
  let sql = `SELECT * FROM role`;
  db.query(sql, [], function(results) {
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
      data: results
    });
  });
});
/**
 * @api {post} /api/menu/add/ 添加子菜单
 * @apiName MenuAdd
 * @apiGroup Role
 * @apiPermission admin
 * 
 * @apiParam {String} name 分类名称.
 * @apiParam {Number} pId 父级id.
 * @apiParam {String} path 菜单url地址.
 * 
 * @apiSampleRequest /api/menu/add/
 */
router.post("/menu/add", function(req, res) {
  let {name, pId, path} = req.body;
  let sql = `INSERT INTO MENU (name,pId,path) VALUES (?,?,?) `;
  db.query(sql, [name, pId, path], function(results, fields) {
    //成功
    res.json({
      status: true,
      msg: "success!",
      data: {
        id: results.insertId
      }
    });
  });
});
/**
 * @api {post} /api/menu/delete/ 删除子菜单
 * @apiName MenuDelete
 * @apiGroup Role
 * @apiPermission admin
 * 
 * @apiParam {Number} id 子菜单id.
 * 
 * @apiSampleRequest /api/menu/delete/
 */
router.post("/menu/delete", function(req, res) {
  let sql = `DELETE FROM MENU WHERE id = ?`;
  db.query(sql, [req.body.id], function(results, fields) {
    //成功
    res.json({
      status: true,
      msg: "success!"
    });
  });
});
/**
 * @api {post} /api/menu/update/ 更新子菜单
 * @apiName MenuUpdate
 * @apiGroup Role
 * @apiPermission admin
 * 
 * @apiParam {Number} id 子菜单id.
 * @apiParam { String } name 子菜单名称.
 * @apiParam { String } path 子菜单url地址.
 * 
 * @apiSampleRequest /api/menu/update/
 */
router.post("/menu/update", function(req, res) {
  let {name, path, id} = req.body;
  let sql = `UPDATE MENU SET name = ? , path = ? WHERE id = ? `;
  db.query(sql, [name, path, id], function(results, fields) {
    //成功
    res.json({
      status: true,
      msg: "success!"
    });
  });
});
/**
 * @api {get} /api/menu/sub/ 获取子级菜单
 * @apiName MenunSub
 * @apiGroup Role
 * @apiPermission admin
 * 
 * @apiParam { Number } pId 父级菜单id。 注： 获取一级菜单pId = 1;
 * 
 * @apiSampleRequest /api/menu/sub/
 */
router.get("/menu/sub/", function(req, res) {
  let sql = `SELECT * FROM MENU WHERE pId = ? `;
  db.query(sql, [req.query.pId], function(results, fields) {
    //成功
    res.json({
      status: true,
      msg: "success!",
      data: results
    });
  });
});
/**
 * @api {get} /api/user/list/ 获取用户列表
 * @apiName UserList
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiSampleRequest /api/user/list
 */
router.get("/user/list", function(req, res) {
  //查询账户数据
  let sql = `SELECT u.id,u.username,u.nickname,u.sex,u.avatar,u.tel,r.role_name,r.id AS role FROM USERS AS u LEFT JOIN user_role AS ur ON u.id = ur.user_id LEFT JOIN role AS r ON r.id = ur.role_id`;
  db.query(sql, [], function(results, fields) {
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
      data: results
    });
  })
});
/**
 * @api {get} /api/user/info/ 获取个人资料
 * @apiName UserInfo
 * @apiGroup User
 * 
 * @apiParam {Number} uid 用户id.
 * 
 * @apiSampleRequest /api/user/info
 */
router.get("/user/info", function(req, res) {
  //查询账户数据
  let sql = `SELECT u.id,u.username,u.nickname,u.sex,u.avatar,u.tel,r.role_name,r.id AS role FROM USERS AS u LEFT JOIN user_role AS ur ON u.id = ur.user_id LEFT JOIN role AS r ON r.id = ur.role_id WHERE user_id = ?`;
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
 * @apiParam { String } tel 手机号码.
 * @apiParam { String } role 用户角色id.
 * 
 * @apiSampleRequest /api/user/info/update/
 */
router.post("/user/info/update/", function(req, res) {
  let {uid, nickname, sex, avatar, tel, role} = req.body;
  let sql = `
    UPDATE users SET nickname = ?,sex = ?,avatar = ? ,tel = ? WHERE id = ?;
    UPDATE user_role SET role_id = ? WHERE user_id = ?;
    `
  db.query(sql, [nickname, sex, avatar, tel, uid, role, uid], function(results, fields) {
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
    sql = `
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
    sql = `
        UPDATE addresses SET isDefault = 0 WHERE uid = ${req.body.uid};
        UPDATE addresses SET uid = ?,name = ?,tel = ?,province = ?,city = ?,area = ?,street = ?,code = ?,isDefault = ? WHERE id = ?;
        `
  } else {
    sql = `UPDATE addresses SET uid = ?,name = ?,tel = ?,province = ?,city = ?,area = ?,street = ?,code = ?,isDefault = ? WHERE id = ?`
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