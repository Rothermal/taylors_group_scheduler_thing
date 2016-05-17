var express = require('express');
var router = express.Router();
var Student = require('../../db/student');

/* GET CURRENT students */
router.get('/:id?', function(req, res, next) {
    if(req.params.id) {
        var query = {_id: req.params.id, isArchived: false};
        Student.findOne(query, null, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        if(Object.keys(req.query).length){
            var query = req.query;
            if(!query.isArchived){
                query.isArchived = false;
            }
        } else {
            var query = {isArchived: false};
        }
        Student.find(query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    }
});

/* POST add new student */
router.post('/', function(req, res, next){
    if(Object.keys(req.body).length > 0){
        Student.add(req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    } else {
        res.send('Invalid request. No data specified.');
    }
});

/* DELETE student */
router.delete('/', function(req, res, next){
    if(Object.keys(req.query).length > 0){
        Student.delete(req.query, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.send('Deleted interviewer ' + data._id);
            }
        })
    } else {
        res.send('Invalid request. Must specify student.');
    }
});

/* PUT update student */
router.put('/:id?', function(req, res, next){
    if(req.params.id){
        Student.update({_id: req.params.id}, req.body, function(err, data){
            if(err){
                console.log(err);
                next(err);
            } else {
                res.json(data);
            }
        })
    }else{
        res.send('Invalid request. Must specify student.');
    }
});

module.exports = router;