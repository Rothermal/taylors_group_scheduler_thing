var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST adds a group of interviewers to the event document */

router.post('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.addBulkInterviewers(req.query, function(err, interviewers){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(interviewers);
            }
        })
    };
});

module.exports = router;