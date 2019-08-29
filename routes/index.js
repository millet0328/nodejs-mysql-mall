const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.redirect("/api")
});

module.exports = router;
