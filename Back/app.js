var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload')



var indexRouter = require('./routes/index');
var artisteRouter = require('./routes/artiste');
var usersRoute = require('./routes/users');
var themeRouter = require('./routes/theme');
var gameImageRouter = require('./routes/game_image')
var imageRouter = require('./routes/image')
var capChatrouter = require('./routes/capchat')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({
  debug: false,
  tempFileDir: './tmp/'
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use('/', indexRouter);
app.use('/artiste' , artisteRouter)
app.use('/users', usersRoute)
app.use('/theme',themeRouter)
app.use('/gameImage', gameImageRouter)
app.use('/image', imageRouter)
app.use('/capchat' , capChatrouter)


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
  console.log(err)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
