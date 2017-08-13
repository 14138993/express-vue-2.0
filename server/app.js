var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var dbUrl='mongodb://localhost:27017/movie';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var admin = require('./routes/admin');
var user  = require('./routes/user');
var comment = require('./routes/comment')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'userSid',
    name:'logonUser',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 5
    },
    store: new MongoStore({
      url: dbUrl,
      collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true    
}));

app.use('/api/movie', index);
app.use('/api/admin', admin);
app.use('/api/user',  user);
app.use('/api/comment',comment);
mongoose.connect(dbUrl,(err)=>{
	if(err){
		console.log('数据库连接失败')
	}else{
		console.log('数据库连接成功')
	}
})
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

module.exports = app;
