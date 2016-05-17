var express = require('express');
var router = express.Router();
var Event = require('../../db/event');
var Students = require('../../db/student');

/* GET event */
router.get('/:id?', function(req, res, next) {
    if(req.params.id) {
        var query = {_id: req.params.id, isArchived: false};
        Event.findOne(query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        Event.find(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    }
});

/* POST add new event */
router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Event.add(req.body, function(err, event){
            if(err){
                console.log(err);
                next(err);
            } else {
                var re = new RegExp(req.body.cohort, "i");
                Students.findCohort({cohort: re}, "_id fName lName email scheduled", function(err, docs){
                    if(err){
                        console.log(err);
                    } else {
                        event.update({$set: {students: docs}}, function(err, status){
                            if(err){console.log(err);}
                            res.json(event);
                        })
                    };
                });
            }
        })
    } else {
        res.send('Invalid request. Must specify data.');
    }
});

/* DELETE event */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify event.');
    }
});

/* PUT update event */
router.put('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.update(req.query, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Updated event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify event.');
    }
});

module.exports = router;