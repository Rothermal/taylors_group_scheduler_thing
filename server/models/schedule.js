var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schedule = new Schema({
    interviewer: Array
});

var scheduleSchema = mongoose.model('schedule', Schedule);

module.exports =  scheduleSchema;