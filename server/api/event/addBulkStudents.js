var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST adds a full cohort of students to the event document */

router.post('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.addBulkStudents(req.query, function(err, students){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(students);
            }
        })
    }
});

module.exports = router;