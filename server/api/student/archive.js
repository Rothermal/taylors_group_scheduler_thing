var express = require('express');
var router = express.Router();
var Student = require('../../db/student');

router.post('/', function(req, res, next){
    var student = req.query,
        status = req.body;
    Student.archive(student, status, function(err, student){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(student);
        }
    })
});

module.exports = router;