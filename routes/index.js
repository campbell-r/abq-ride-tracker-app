var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/dashboard-test', function(res, res,next){
  res.render('dashboard-test')
})

module.exports = router;
