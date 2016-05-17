var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST add weight to student */

router.post('/', function(req, res, next){
    var event = req.query,
        weight = req.body;

    if(Object.keys(weight).length > 1){
        Event.addStudentWeight(event, weight, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    }
});


/* POST remove weight from student */

router.post('/remove', function(req, res, next){
    var event = req.query,
        weight = req.body;

    Event.removeStudentWeight(event, weight, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;