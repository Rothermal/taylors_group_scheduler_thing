var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST remove interviewer from event */

router.post('/', function(req, res, next){
    var event = req.query,
        interviewer = req.body;

    Event.removeInterviewer(event, interviewer, function(err, update){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(update);
        }
    })
});

module.exports = router;