var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
require('dotenv').config({ path: `.env` });

const { connectDatabase } = require('./config/index');
const routes = require('./routes');

connectDatabase()

var app = express();
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//import routes
app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // console.error(err.stack);
  console.error(message);
  res.status(status).json({
    error: {
      status: status,
      message: message,
    },
  });
  next();
});

module.exports = app;