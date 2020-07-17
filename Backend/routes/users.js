var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
});

// sign up routes
router.post('/signup', function(req,res,next){
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password)       
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

// login and out routes
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
      res.redirect('http://localhost.com/signup');
    }
  });
});

router.get('/logout', function(res, req){
  res.cookie('jwt', "", {expires: new Date (0)});
  res.send('Logged Out');
});

// user profile
router.get('/profile', function(req, res, next){
  let token = req.cookies.jwt;
  if (token) {
  authService.verifyUser(token)
  .then(user => {
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.status(401);
      res.send('Invalid auth');
    }
  });
} else {
  res.send(401);
  res.send('Must be logged in');
  }
});



// CRUD
// .post -> create
// .put -> update
// .get -> get one
// .get -> get all
module.exports = router;
