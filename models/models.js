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
    id: String,
    level: Number,
    name: String,
    pId: {
        type: String,
        default: "0"
    },
    parentTId: String,
    tId: String
});

// 大写代表model
models.Category = mongoose.model('Category', categorySchema);

// 商品结构
var goodsSchema = mongoose.Schema({
        cateFirst: {
            type: String,
            ref: "Category"
        },
        cateSecond: {
            type: String,
            ref: "Category"
        },
        cateThird: {
            type: String,
            ref: "Category"
        },
        name: String,
        hotPoint: String,
        price: Number,
        marketPrice: Number,
        cost: Number,
        discount: String,
        inventory: Number,
        articleNo: Number,
        lgImg: String,
        mdImg: String,
        slideImgs: [String],
        brand: String,
        detail: String,
        Province: String,
        City: String,
        Area: String,
        freight: Number
    }, // schema options: Don't forget this option
    // if you declare foreign keys for this schema afterwards.
    {
        // toObject: { virtuals: true },
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: { virtuals: true }
    });
goodsSchema.virtual('category_1st', {
    ref: 'Category', // The model to use
    localField: 'cateFirst', // Find people where `localField`
    foreignField: 'id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true
});
// 大写代表model
models.Goods = mongoose.model('Goods', goodsSchema);

// 模块化
module.exports = models;