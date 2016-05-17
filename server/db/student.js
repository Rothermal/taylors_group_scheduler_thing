var StudentModel = require('../models/student');
var InterviewerModel = require('../models/interviewer');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require('fs');
var path = require('path');
var ObjectId = require('mongoose').Types.ObjectId;

var Student = {
    bulkImport: function(file, callback){
        fs.createReadStream(file).pipe(converter);

        converter.on("end_parsed", function(array){
            array.forEach(function(student){
                var normStudent = newObject(student);
                Student.add(normStudent, function(err, student){
                    if(err){
                        console.log(err);
                        next(err);
                    } else {
                        console.log('added ' + student.fName + " " + student.lName);
                    }
                });
            });
            callback(null, array);
        });
    },
    add: function(body, callback){
        var newStudent = new StudentModel(body);
        //save student in database
        newStudent.save(function(err){
            if(err){
                console.log(err);
            }
        });
        callback(null, newStudent);
    },
    find: function(query, callback){
        if(query.cohort){
            var keys = Object.keys(query);
            var value = query[keys[0]];
            var re = new RegExp(value, "i");
            query.cohort = re;
        }
        StudentModel.find(query, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        });
    },
    findOne: function(query, projections, callback){
        StudentModel.findOne(query, projections, function(err, doc){
            if(err){
                console.log(err);
            } else {
                callback(null, doc);
            }
        })
    },
    findCohort: function(query, conditions, callback){
      StudentModel.find(query, conditions, function(err, doc){
          if(err){
              console.log(err);
          } else {
              callback(null, doc);
          }
      })
    },
    findManyById: function(array, callback){
      StudentModel.find({_id: {$in: array}}, function(err, docs){
          if(err){
              console.log(err);
          } else {
              callback(null, docs);
          }
      })
    },
    delete: function(query, callback){
        var conditions = query || {};
        StudentModel.findOneAndRemove(conditions, function(err, doc){
            if(err){
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        });
    },
    update: function(query, body, callback){
        StudentModel.findOneAndUpdate(query, body, {new: true}, function (err, doc) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                callback(null, doc);
            }
        })
    },
    archive: function(query, status, callback){
        StudentModel.findOneAndUpdate({_id: ObjectId(query._id)}, status, {new: true}, function(err, student){
            if(err){console.log(err)}
            callback(null, student);
        })
    }
};

function newObject(oldObject){
    var newObject = {};
    var newKeys = ['fName', 'lName', 'email', 'cohort'];
    var values = [];
    var i;

    for(key in oldObject) {
        values = Object.keys(oldObject).map(key => oldObject[key]);
    }

    for(i = 0; i < newKeys.length; i++){
        newObject[newKeys[i]] = values[i]
    }

    return newObject;
}

module.exports = Student;