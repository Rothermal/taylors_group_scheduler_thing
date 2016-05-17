var InterviewerModel = require('../models/interviewer');
var Converter = require('csvtojson').Converter;
var fs = require('fs');
var StudentModel = require('../models/student');
var ObjectId = require('mongoose').Types.ObjectId;

var Interviewer = {
    bulkImport: function(file, callback){
        var converter = new Converter({});
        converter.on("end_parsed", function(array){
            array.forEach(function(interviewer){
                var normInterviewer = newObject(interviewer);
                Interviewer.add(normInterviewer, function(err, interviewer){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added ' + interviewer.fName + " " + interviewer.lName);
                    }
                });
            });
            callback(null, array);
        });

        fs.createReadStream(file).pipe(converter);
    },
    add: function(body, callback){
        var newInterviewer = new InterviewerModel(body);
        //save interviewer in database
        newInterviewer.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newInterviewer);
    },
    find: function(query, projection, callback){
        InterviewerModel.findOne(query, projection, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    findMany: function(query, projection, callback){
      InterviewerModel.find(query, projection, function(err, docs){
          if(err){
              console.log(err);
          } else {
              callback(null, docs);
          }
      })
    },
    findManyById: function(array, callback){
        InterviewerModel.find({_id: {$in: array}}, function(err, docs){
            if(err){
                console.log(err);
            } else {
                callback(null, docs);
            }
        })
    },
    delete: function(query, callback){
        var conditions = query || {};
        InterviewerModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback){
        InterviewerModel.findOneAndUpdate(query, body, {new: true, upsert: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    editUnavail: function(query, slots, callback){
        InterviewerModel.findOneAndUpdate({_id: ObjectId(query._id)}, {unavailable: slots}, {new: true, upsert: true}, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    archive: function(query, status, callback){
        InterviewerModel.findOneAndUpdate({_id: ObjectId(query._id)}, status, {new: true}, function(err, interviewer){
            if(err){console.log(err)}
            callback(null, interviewer);
        })
    }
};

function newObject(oldObject){
    var newObject = {};
    var newKeys = ['fName', 'lName', 'email', 'company'];
    var values = [];
    var i;

    for(key in oldObject) {
        values = Object.keys(oldObject).map(key = oldObject[key]);
    }

    for(i = 0; i < newKeys.length; i++){
        newObject[newKeys[i]] = values[i]
    }

    return newObject;
}

module.exports = Interviewer;