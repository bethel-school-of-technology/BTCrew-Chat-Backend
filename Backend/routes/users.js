var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
});


router.post('/signup', function(req,res,next){
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        Password:req.body.password        
      }
    })
    .spread(function(result, created){
      if (created){
        res.json({message: 'User successfully created'});
      } else {
        res.json({message: 'This User already exsists.'});
      }
    });
});

router.post('/login', function(req, res, next){
  models.users.findOne({
    where: {
      Username: req.body.username,
      Password: req.body.password
    }
  }).then(user => {
    if (!user){
      console.log("User not found");
      return res.status(401).json({
        message: "Login Failed, Please Try Again"
      })
    } 
    if (user) {
      let token = authService.signUser(user);
      res.cookie('jwt', token);
      res.json({message: "Login Successful"});
    } else {
      console.log('Wrong Password');
      res.redirect('http://localhost.com/signup')
    }
  });
});


// user profile

module.exports = router;
