var express = require('express');
var router = express.Router();
var Event = require('../../db/event');
var Students = require('../../db/student');
var Interviewers = require('../../db/interviewer');
var Tools = require('../../lib/tools');
var Schedule = require('../../db/schedule');
var async = require('async');

router.get('/', function(req, res, next){
    async.waterfall([
        function(callback){
            //find event
            Event.findOne(req.query._id, function(err, event){
                if(err){console.log(err)}
                callback(null, event);
            })
        },
        function(event, callback){
            //grab students in event
            Students.findManyById(event.students, function(err, students){
                if(err){console.log(err)}
                callback(null, event, students);
            })
        },
        function(event, students, callback){
            //grab interviewers in event
            Interviewers.findManyById(event.interviewers, function(err, interviewers){
                if(err){console.log(err)}
                callback(null, event, students, interviewers);
            })
        },
        function(event, students, interviewers, callback){
            var duration = (parseInt(event.endTime) - parseInt(event.startTime)) * 60;
            var slots = Math.floor(duration / event.interviewDuration);
            var b = {fName: 'Break', lName: ''};
            students.push(b);
            //create interview schedule
            Tools.schedule(slots, interviewers, students, event._id, function(schedule){
                callback(null, schedule);
            })
        },
        function(schedule, callback){
            //save schedule to schedule db
            Schedule.add(schedule, function(err, schedule){
                if(err){console.log(err)}
                callback(null, schedule);
            })
        }
    ], function(err, result){
        if(err){console.log(err)}
        res.json(result);
    })
});

module.exports = router;