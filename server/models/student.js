var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
    fName: String,
    lName: String,
    cohort: String,
    email: String,
    scheduled: {
        with: {type: Schema.Types.Mixed, default: {}},
        count: {type: Schema.Types.Mixed, default: {
            total: 0
        }}
    },
    isArchived: {type: Boolean, default: false}
}, { minimize: false });

var studentSchema = mongoose.model('student', Student);

module.exports =  studentSchema;