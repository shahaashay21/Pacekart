var createError = require('http-errors');
var express = require('express');
var routes = require('./routes/routes');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session')
var logger = require('morgan');
var mongoose = require('mongoose');
var csrf = require('csurf');
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);

//CSRF token
var csrfProtection = csrf({ cookie: true });

var app = express();
require('dotenv').config();
app.use(helmet());
module.exports = app

if (process.env.NODE_ENV == 'test'){
  mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME_TEST, { useNewUrlParser: true });
} else if (process.env.NODE_ENV == 'production'){
  mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME, { useNewUrlParser: true });
} else {
  // mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME, { useNewUrlParser: true });
  mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME_TEST, { useNewUrlParser: true });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection);
app.use(session({
  key: process.env.SECRET_KEY,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {},
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler for CSRF token
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with')
})

// global error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
