// Express init
var express = require('express');
var app = express();

// other packages
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

// MongoDB connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/interviewly_dev');

// require routes
var index = require('./routes/index');
var authenticate = require('./routes/authenticate');
var forgot = require('./routes/forgot');
var reset = require('./routes/reset');

// require APIs
var profile = require('./routes/profile');
var interviewer = require('./api/interviewer/interviewer');
var student = require('./api/student/student');
var users = require('./api/user');
var event = require('./api/event/event');
var schedule = require('./api/schedule/schedule');
var addInterviewerToEvent = require('./api/event/addInterviewer');
var addBulkInterviewersToEvent = require('./api/event/addBulkInterviewers');
var addStudentToEvent = require('./api/event/addStudent');
var addBulkStudentsToEvent = require('./api/event/addBulkStudents');
var getSchedule = require('./api/event/getSchedule');
var removeStudentFromEvent = require('./api/event/removeStudent');
var removeInterviewerFromEvent = require('./api/event/removeInterviewer');
var interviewerWeight = require('./api/event/interviewerWeight');
var studentWeight = require('./api/event/studentWeight');
var interviewerUnavail = require('./api/interviewer/unavail');
var saveScheduleToEvent = require('./api/event/saveSchedule');
var archiveStudent = require('./api/student/archive');
var archiveInterviewer = require('./api/interviewer/archive');
var archiveEvent = require('./api/event/archive');
var upload = require('./api/upload');
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'jade');

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'client/app/assets/img', 'favicon.png')));

// log stuff
//app.use(logger('dev'));

// parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// serve clientnpm sta
app.use(express.static('client/app'));

app.use('/authenticate', authenticate);
// use routes

// use APIs
app.use('/forgot', forgot);
app.use('/reset', reset);
app.use('/api/*', expressJwt({secret: process.env.SECRET || "devsecret"}));
app.use('/api/profile', profile);
app.use('/api/interviewer', interviewer);
app.use('/api/student', student);
app.use('/api/event', event);
app.use('/api/schedule', schedule);
app.use('/api/users', users);
app.use('/api/event/addInterviewer', addInterviewerToEvent);
app.use('/api/event/addStudent', addStudentToEvent);
app.use('/api/event/addBulkStudents', addBulkStudentsToEvent);
app.use('/api/event/addBulkInterviewers', addBulkInterviewersToEvent);
app.use('/api/removeInterviewer', removeInterviewerFromEvent);
app.use('/api/removeStudent', removeStudentFromEvent);
app.use('/api/getSchedule', getSchedule);
app.use('/api/interviewer/unavail', interviewerUnavail);
app.use('/api/event/saveSchedule', saveScheduleToEvent);
app.use('/api/student/archive', archiveStudent);
app.use('/api/interviewer/archive', archiveInterviewer);
app.use('/api/event/archive', archiveEvent);
app.use('/api/upload', upload);
app.use('/api/event/interviewerWeight', interviewerWeight);
app.use('/api/event/studentWeight', studentWeight);
app.use('/', index);

//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handling for unauthorized API requests
//app.use(function(err, req, res, next) {
//  if(err.name === 'UnauthorizedError') {
//    res.status(401).send('invalid token');
//  }
//});
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});

var server = app.listen(port,function(){
  var port = server.address().port;
  console.log('now open on port',port);
});

module.exports = app;
