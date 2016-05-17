var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    cohort: {type: String, required: true},
    type: String,
    date: {type: Date, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    interviewDuration: {type: Number, required: true},
    students: Array,
    interviewers: Array,
    schedule: Array,
    interviewerWeight: Array,
    studentWeight: Array,
    isArchived: { type: Boolean, default: false }
});

var eventSchema = mongoose.model('event', Event);

module.exports =  eventSchema;