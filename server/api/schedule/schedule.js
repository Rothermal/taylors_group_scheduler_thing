var express = require('express');
var router = express.Router();
var Event = require('../../db/event');

/* GET schedule */
router.get('/', function(req, res, next) {
    var query = req.query || {};
    Event.find(query, function(err, data){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(data);
        }
    })
});

/* POST add new schedule */
router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Event.add(req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        res.send('Invalid request. Must specify schedule.');
    }
});

/* DELETE schedule */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify schedule.');
    }
});

/* PUT update schedule */
router.put('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Event.update(req.query, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Updated event ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify schedule.');
    }
});

module.exports = router;