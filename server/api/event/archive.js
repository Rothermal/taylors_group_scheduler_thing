var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* POST to archive event */
router.post('/', function(req, res, next){
    var event = req.query,
        status = req.body;
    Event.archive(event, status, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;