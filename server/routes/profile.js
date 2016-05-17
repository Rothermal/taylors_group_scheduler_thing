var express = require('express'),
    router= express.Router(),
    User = require('../models/users');

/* PUT /api/profile */

router.put('/', function(req, res, next){

    //find user by id and update the information

    User.findById(req.body._id, function(err, doc) {
        if(err){
            console.log(err);
            next(err);
        } else {
            doc.username = req.body.username;
            doc.email = req.body.email;
            doc.password = req.body.password;

            doc.save(function(err, user){
                if(err){
                    console.log(err);
                }
                res.status(200).send('Updated user successfully.');
            });
        }
    });

});

module.exports = router;