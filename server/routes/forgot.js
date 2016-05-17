var express = require('express'),
    router= express.Router(),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    User = require('../models/users');

//need to add an exception for empty(required)
router.post('/', function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err, token)
            });
        },
        function(token, done){
            User.findOne({email: req.body.email}, function(err, user){
                if(!user){
                    res.json({error: 'not found'});
                } else {
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(function(err){
                        done(err, token, user);
                    });
                }
            });
        },
        function(token, user, done){
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'nodemailertest123@gmail.com',
                    pass: 'fakepassword'
                }
            });
            var mailOptions = {
                to: {name: user.username, address: user.email},
                from: 'Prime Digital Academy <nodemailertest123@gmail.com>',
                subject: 'Password Reset',
                text: 'http://'+req.headers.host+'/#/reset/'+token
            };
            transporter.sendMail(mailOptions, function(err){
                done(err, 'done')
            });
        }
    ], function(err){
    if(err) {
        return next(err);
    } else {
        res.redirect('/');
    }
    });
});

module.exports = router;