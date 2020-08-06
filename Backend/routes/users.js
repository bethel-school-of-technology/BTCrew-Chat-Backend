var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
});

// sign up routes
router.get('/signup', function(req, res, next){
  res.render('signup');
});

router.post('/signup', function(req,res,next){
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password)       
      }
    })
    .spread(function(result, created){
      if (created){
        res.send('User successfully created');
      } else {
        res.send('This User already exsists.');
      }
    });
});

// login and out routes
router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', function(req, res, next){
  models.users.findOne({
    where: {
      UserId: req.body.userid
    }
  }).then(user => {
    if (!user){
      console.log("User not found");
      return res.status(401).json({
        message: "Login Failed, Please Try Again"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password,user.password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login Successful');
      } else {
        console.log('Wrong Password');
        res.send('Wrong Password');
      }

      console.log('Wrong Password');
      //res.redirect('http://localhost.com/signup')

    }
  });
});

router.get('/logout', function(res, req){
  res.cookie('jwt', "", {expires: new Date (0)});
  res.send('Logged Out');
});



// CRUD
// .post -> create
// .put -> update
// .get -> get one
// .get -> get all
module.exports = router;
