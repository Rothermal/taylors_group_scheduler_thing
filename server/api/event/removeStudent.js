var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST remove a student from an event */

router.post('/', function(req, res, next){
    var event = req.query,
        student = req.body;

    Event.removeStudent(event, student, function(err, update){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(update);
        }
    })
});

module.exports = router;