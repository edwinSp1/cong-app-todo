
const session = require('express-session')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');
var todoRouter = require('./routes/todo');
var wellnessRouter = require('./routes/wellness');
var usersRouter = require('./routes/users');
var sleepRouter = require('./routes/sleep');
var collegeRouter = require('./routes/college')
var app = express();
// view engine setup
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/notes', notesRouter);
app.use('/todo', todoRouter);
app.use('/wellness', wellnessRouter);
app.use('/users', usersRouter);
app.use('/sleep', sleepRouter);
app.use('/college', collegeRouter);
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
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

