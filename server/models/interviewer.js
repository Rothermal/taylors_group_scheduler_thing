var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Interviewer = new Schema({
    title: String,
    fName: String,
    lName: String,
    email: String,
    company: String,
    url: String,
    description: String,
    scheduled: {type: Schema.Types.Mixed, default: {}},
    unavailable: {type: Schema.Types.Mixed, default: {}},
    breaks: {type: Number, default: 0},
    single: {type: Boolean, default: true},
    isArchived: {type: Boolean, default: false}
}, { minimize: false });

var interviewerSchema = mongoose.model('interviewer', Interviewer);

module.exports =  interviewerSchema;