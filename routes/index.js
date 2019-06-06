var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

router.get('/', function(req, res, next){
  res.render('index');
});
router.get('/login', function(req, res, next){
  res.render('login');
});
router.get('/register', function(req, res, next){
  res.render('register');
});


router.post('/register', function(req, res, next){
  if(req.body.email &&
     req.body.name &&
     req.body.password &&
     req.body.password2){
       //check if passwords match
       if(req.body.password !== req.body.password2){
         let err  = new Error("Passwords don't match");
         err.status = 400;
         res.render('error', {errormessage: err});
         return next(err);
       }
       //object to store the data the user entered
       const userData = {
         email: req.body.email,
         name: req.body.name,
         password: req.body.password
       };
       //insert this data into mongoDB
       User.create(userData, function(error, user){
         if(error){
           return next(err)
           }else{
             res.render('dashboard', {message: user.name});

         }
       });
     }else{
       let err = new Error('All fields are required');
       err.status = 400;
       res.render('error', {errormessage: err});
     }
});

module.exports = router;
