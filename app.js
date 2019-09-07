var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require("express-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mainRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var rsvpRouter = require('./routes/rsvp');
var statusRouter = require('./routes/status');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

var bodyParser = require('body-parser');

var app = express();


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded());
app.use(session({
  secret: "rsoolyn",
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge : 604800000
  }
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('development'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", loginRouter);
app.use('/main', mainRouter);
app.use('/login', loginRouter);
app.use("/rsvp", rsvpRouter);
app.use("/status", statusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("ERROR: " +_err.status);
  // render the error page
  res.status(err.status || 500);
//  res.render('error');
  res.end();
});

module.exports = app;
