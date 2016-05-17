var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* POST USER CREATE*/
router.post('/', function(req, res, next) {
    if (req.body.username.length > 0 && req.body.email.length > 0 && req.body.password.length > 0) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                console.log(err)
            }
            res.sendStatus(200);
        })
    }
});

module.exports = router;