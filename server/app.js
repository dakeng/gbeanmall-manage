import express from 'express';
import path from 'path';
import favicom from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from  'body-parser';
import session from 'express-session';
import fs from 'fs';
import db from './db';

const MongoStore = require('connect-mongo')(session);

var cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/api/users');
const commodity = require('./routes/api/commodity');
const task = require('./routes/api/task');

const app = express();


// view engine setup
/* app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views')); */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* 
app.use(session({
  name: 'user_session',
  secret: 'gbeanmall',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new MongoStore({mongooseConnection: db})
})); */

//跨域请求处理
app.options('*', cors());

app.use('/', index);
app.use('/user', users);
app.use('/commodity', commodity);
app.use('/task', task);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
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

module.exports = app;

//这代码写的我都想掐死自己辣鸡