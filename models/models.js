// 定义数据库存储结构

var mongoose = require("../config/mongoose");
var models = {};

// 账户结构
var userSchema = mongoose.Schema({
	account: String,
	password: String,
	nickname: {
		type: String,
		default: ''
	},
	sex: {
		type: String,
		default: '男'
	},
	avatar: {
		type: String,
		default: 'img/userlogo.png'
	}
});

// 大写代表model
models.User = mongoose.model('User', userSchema);

//收货地址
var addressSchema = mongoose.Schema({
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	name: String,
	tel: String,
	city: String,
	street: String,
	isDefault: Boolean
});
// model化
models.Address = mongoose.model('Address', addressSchema);

//商品分类结构
var categorySchema = mongoose.Schema({
	id: Number,
	level: Number,
	name: String,
	pId: {
		type: Number,
		default: 0
	},
	parentTId: String,
	tId: String
});

// 大写代表model
models.Category = mongoose.model('Category', categorySchema);

// 商品结构
var goodsSchema = mongoose.Schema({
	name: String,
	price: String
});

// 大写代表model
models.Goods = mongoose.model('Goods', goodsSchema);

// 模块化
module.exports = models;