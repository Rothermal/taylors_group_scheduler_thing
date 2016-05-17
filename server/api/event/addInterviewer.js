var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST to add interviewer to event */
//query interviewer with fName and company in qs

router.post('/', function(req, res, next){
    var event = req.query,
        interviewer = req.body;

    Event.addInterviewerToEvent(event, interviewer, function(err, interviewer){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(interviewer);
        }
    })
});

module.exports = router;