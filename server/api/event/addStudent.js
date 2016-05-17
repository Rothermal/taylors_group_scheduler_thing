var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST add student to event */

router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        var event = req.query,
            student = req.body;

        Event.addStudentToEvent(student, event, function(err, student){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(student);
            }
        })
    }
});

module.exports = router;