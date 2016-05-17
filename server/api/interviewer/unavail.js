var express = require('express');
var router = express.Router();
var Interviewer = require('../../db/interviewer');

/* POST to add/edit unavailable slots for interviewer */

router.post('/', function(req, res, next){
    var interviewer = req.query,
        slots = req.body;

    Interviewer.editUnavail(interviewer, slots, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;