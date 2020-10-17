var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accTrackerRouter = require('./routes/acctrack.route');
var loginRouter = require('./routes/login.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', accTrackerRouter);
app.use('/api', loginRouter);

module.exports = app;
