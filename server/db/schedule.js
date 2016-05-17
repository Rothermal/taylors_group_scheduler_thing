var ScheduleModel = require('../models/schedule');

var Schedule = {
    add: function(body, callback){
        var schedule = new ScheduleModel(body);
        //save schedule in database
        schedule.save(function(err){
            if(err){
                console.log(err);
            }
            callback(null, schedule);
        });
    },
    find: function(query, callback){
        ScheduleModel.find(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    delete: function(query, callback){
        var conditions = query || {};
        ScheduleModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback) {
        ScheduleModel.findOneAndUpdate(query, body, {new: true}, function (err, doc) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    }
};

module.exports = Schedule;