const mysql = require('mysql2/promise');
// 连接池pool（用于普通查询）
let pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mall',
	// debug: true,
});

module.exports = pool;
