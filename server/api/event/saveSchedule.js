var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST saves schedule to event */
router.post('/', function(req, res, next){
    var event = req.query,
        schedule = req.body;

    Event.saveSchedule(event, schedule, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;