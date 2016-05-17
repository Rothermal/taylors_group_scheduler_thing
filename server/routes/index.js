var express = require('express');
var router = express.Router();
var Tools = require('../lib/tools');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Interviewly'});
});


router.get('/*', function(request, response){
  response.redirect('/');
});

module.exports = router;
