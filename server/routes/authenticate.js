var express = require('express');
var router = express.Router();
var user = require('../models/users');

router.post('/', function(req, res, next){
    if (req.body.username === undefined || !req.body.username.length) {
        res.status(400).send("Username Required.");
    } else if (req.body.password === undefined || !req.body.password.length) {
        res.status(400).send("Password Required.");
    }
    else {
        user.getAuthenticated(req.body, function (err, token) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err.message);
            } else {
                res.send(token);
            }
        })
    }
});

module.exports = router;