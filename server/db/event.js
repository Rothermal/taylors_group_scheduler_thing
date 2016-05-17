var EventModel = require('../models/Event');
var Interviewers = require('./interviewer');
var Students = require('./student');
var Schedule = require('./schedule');
var ObjectId = require('mongoose').Types.ObjectId;

var Event = {
    add: function(body, callback){
        var newEvent = new EventModel(body);
        //save event in database
        newEvent.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newEvent);
    },
    find: function(query, collection, callback){
        EventModel.find(query,collection, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    findOne: function(query, callback){
        query._id = ObjectId(query._id);
        EventModel.findById(query, function(err, doc){
            if(err){
                console.log(err);
            } else {

              callback(null, doc);
            }
      })
    },
    delete: function(query, callback){
        var conditions = query || {};
        EventModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback){
        EventModel.findOneAndUpdate(query, body, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addSchedule: function(query, schedule, callback){
        EventModel.findOneAndUpdate(query, {$push: {schedule: schedule}}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    addInterviewerToEvent: function(event, interviewer, callback){
        Interviewers.find({_id: interviewer._id}, '_id fName lName company', function(err, interviewer){
            if(err){
                console.log(err);
            } else {
                if(interviewer){
                    EventModel.findOneAndUpdate({_id: ObjectId(event._id)}, {$addToSet: {interviewers: interviewer}}, {new: true}, function(err, doc){
                        if(err){
                            console.log(err);
                        } else {
                            var duration = (parseInt(doc.endTime) - parseInt(doc.startTime)) * 60,
                                slots = Math.floor(duration / doc.interviewDuration),
                                id = doc._id,
                                avail = {};

                            while(slots--){
                                var slot = slots + 1;
                                avail['slot' + slot] = false;
                            }
                            var setModifier = { $set: {} };
                            setModifier.$set['unavailable.' + id] = avail;
                            Interviewers.update({_id: ObjectId(interviewer._id)}, setModifier, function(err, update){
                                if(err){console.log(err)};
                                callback(null, doc);
                            })
                        }
                    })
                } else {
                    callback(null, 'No interviewer found with that ID.');
                }
            }
        });
    },
    removeInterviewer: function(event, interviewer, callback){
        EventModel.findOneAndUpdate({_id: ObjectId(event._id)},
            { $pull: {interviewers: {_id: ObjectId(interviewer._id)}}}, {new: true}, function(err, event){
                if(err){
                    console.log(err);
                } else {
                    callback(null, event);
                }
        })
    },
    addBulkStudents: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Students.findCohort({cohort: event.cohort}, '_id fName lName', function(err, students){
                EventModel.findOneAndUpdate({_id: event._id}, {$addToSet: {students: {$each: students}}}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                });
            });
        });
    },
    addBulkInterviewers: function(event, callback){
        EventModel.findOne({cohort: event.cohort, type: event.type}, function(err, event){
            Interviewers.findMany({}, '_id fName lName company', function(err, interviewers){
                EventModel.findOneAndUpdate({_id: event._id}, {$addToSet: {interviewers: {$each: interviewers}}}, {new: true}, function(err, doc){
                    if(err){console.log(err)}
                    callback(null, doc);
                });
            })
        })
    },
    addStudentToEvent: function(student, event, callback){
        Students.findOne({_id: student._id}, '_id fName lName', function(err, student){
           if(err){console.log(err)}
            else {
                EventModel.findOneAndUpdate({_id: ObjectId(event._id)}, {$addToSet: {students: student}}, {new: true}, function(err, doc){
                    if(err){
                        console.log(err);
                    } else {
                        callback(null, doc);
                    }
                })
            }
        });
    },
    removeStudent: function(event, student, callback){
        EventModel.findOneAndUpdate({_id: ObjectId(event._id)},
            { $pull: {students: {_id: ObjectId(student._id)}}}, {new: true}, function(err, event){
                if(err){
                    console.log(err);
                } else {
                    callback(null, event);
                }
            })
    },
    saveSchedule: function(event, schedule, callback){
        Schedule.find({_id: schedule._id}, function(err, schedule){
            EventModel.findOneAndUpdate({_id: event._id},
                {$set: {schedule: schedule}}, {new: true}, function(err, event){
                    if(err){
                        console.log(err);
                    } else {
                        callback(null, event);
                    }
                })
        });
    },
    archive: function(query, status, callback){
        EventModel.findOneAndUpdate({_id: ObjectId(query._id)}, status, {new: true}, function(err, event){
            if(err){console.log(err)}
            callback(null, event);
        })
    },
    addStudentWeight: function(query, body, callback){
        Students.findOne({_id: ObjectId(body.studentId)}, null, function(err, student){
            if(err){console.log(err)}
            Interviewers.find({_id: ObjectId(body.interviewerId)}, null, function(err, interviewer){
                if(err){console.log(err)}
                EventModel.findOneAndUpdate({_id: ObjectId(query._id)},
                    {$addToSet: { studentWeight: {
                        studentId: student._id,
                        interviewerId: interviewer._id,
                        studentName: student.fName + ' ' + student. lName,
                        interviewerName: interviewer.fName + ' ' + interviewer.lName,
                        weight: body.weight
                    }}}, {new: true, upsert: true}, function(err, event){
                    if(err){console.log(err)}
                    callback(null, event);
                })
            })
        });
    },
    removeStudentWeight: function(query, weight, callback){
        EventModel.findOneAndUpdate({_id: ObjectId(query._id)}, {$pull: {studentWeight: weight}}, {new: true}, function(err, doc){
            if(err){console.log(err)}
            callback(null, doc);
        })
    },
    addInterviewerWeight: function(query, body, callback){
        Students.findOne({_id: ObjectId(body.studentId)}, null, function(err, student){
            if(err){console.log(err)}
            Interviewers.find({_id: ObjectId(body.interviewerId)}, null, function(err, interviewer){
                if(err){console.log(err)}
                EventModel.findOneAndUpdate({_id: ObjectId(query._id)},
                    {$addToSet: { interviewerWeight: {
                        studentId: student._id,
                        interviewerId: interviewer._id,
                        studentName: student.fName + ' ' + student.lName,
                        interviewerName: interviewer.fName + ' ' + interviewer.lName,
                        weight: body.weight
                    }}}, {new: true, upsert: true}, function(err, event){
                        if(err){console.log(err)}
                        callback(null, event);
                    })
            })
        });
    },
    removeInterviewerWeight: function(query, weight, callback){
        EventModel.findOneAndUpdate({_id: ObjectId(query._id)}, {$pull: {interviewerWeight: weight}}, {new: true}, function(err, doc){
            if(err){console.log(err)}
            callback(null, doc);
        })
    }
};

module.exports = Event;