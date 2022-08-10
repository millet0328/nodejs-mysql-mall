var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 处理 async error
require('express-async-errors');
// JSON WEB TOKEN
const expressJwt = require('express-jwt');
// CORS
const cors = require('cors');

let index = require('./routes/index');

let order = require('./routes/mall/order');
let user = require('./routes/mall/user');
let address = require('./routes/mall/address');
let goods = require('./routes/mall/goods');
let cart = require('./routes/mall/cart');
let userUpload = require('./routes/mall/upload');
let PCCT = require('./routes/mall/PCCT');
let collection = require('./routes/mall/collection');

let role = require('./routes/admin/role');
let menu = require('./routes/admin/menu');
let admin = require('./routes/admin/admin');
let category = require('./routes/admin/category');
let sellerGoods = require('./routes/admin/goods');
let adminUpload = require('./routes/admin/upload');
let sellerOrder = require('./routes/admin/order');
let icon = require('./routes/admin/icon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置跨域资源分享CORS
app.use(cors({ credentials: true, origin: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/ }));

//使用中间件验证token合法性
app.use(expressJwt({ secret: 'secret', algorithms: ['HS256'] }).unless({
  path: ['/', '/user/login', '/user/register', '/goods/list', '/goods/detail', '/category/sub', '/admin/register', '/admin/login'] //除了这些地址，其他的URL都需要验证
}));

app.use('/', index);
//前台
app.use('/address', address);
app.use('/user', user);
app.use('/goods', goods);
app.use('/cart', cart);
app.use('/order', order);
app.use('/upload', userUpload);
app.use('/pcct', PCCT);
app.use('/collection', collection);
//后台
app.use('/role', role);
app.use('/menu', menu);
app.use('/admins', admin);
app.use('/category', category);
app.use('/seller/goods', sellerGoods);
app.use('/upload', adminUpload);
app.use('/seller/order', sellerOrder);
app.use('/system/icon', icon);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 处理401错误
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: false,
      ...err,
    });
  } else {
    next(err);
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
