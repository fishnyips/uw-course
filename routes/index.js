var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');



router.get('/', function(req, res, next) {
	console.log('rendered');
	res.send('Success');
});



module.exports = router;
