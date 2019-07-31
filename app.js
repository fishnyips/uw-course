var dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");

var indexRouter = require('./routes/index');
var scheduleRouter = require('./routes/schedule');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
	if (
		[
			".css",
			".js",
			".jpg",
			".jpeg",
			".gif",
			".ico",
			".png",
			".bmp",
			".pict",
			".csv",
			".doc",
			".pdf",
			".pls",
			".ppt",
			".tif",
			".tiff",
			".eps",
			".ejs",
			".swf",
			".midi",
			".mid",
			".ttf",
			".eot",
			".woff",
			".woff2",
			".otf",
			".svg",
			".svgz",
			".webp",
			".docx",
			".xlsx",
			".xls",
			".pptx",
			".ps",
			".class",
			".jar", 
			".map"
		].indexOf(path.extname(req.path)) === -1
	) {
		logger("dev")(req, res, next);
	} else {
		next();
	}
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
