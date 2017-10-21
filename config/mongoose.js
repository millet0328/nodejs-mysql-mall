var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 连接数据库
mongoose.connect('mongodb://localhost/app', {
    useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;