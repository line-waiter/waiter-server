const SERVER_URL = getUrl();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require("dotenv").config();

var index = require('./routes/index');
var users = require('./routes/users');
var jobAPI = require('./api/jobAPI');
var userAPI = require('./api/userAPI');
var authAPI = require('./api/authAPI');

var authMiddleware = require('./auth/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieSession({
  name: 'session',
  keys:[process.env.SESSION_KEY_1,process.env.SESSION_KEY_2,process.env.SESSION_KEY_3]
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: SERVER_URL,
  credentials: true
}));

app.use('/', index);
app.use('/users', users);
app.use('/jobAPI', jobAPI);
app.use('/authAPI', authAPI);
app.use('/userAPI', userAPI);
// authMiddleware.ensureLoggedIn,


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function getUrl(){
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:8080';
  } else {
    return 'https://line-waiter.firebaseapp.com/';
  }
};

module.exports = app;
