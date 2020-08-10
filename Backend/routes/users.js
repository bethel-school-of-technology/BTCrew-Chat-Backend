var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


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
        res.json({
          message:'User successfully created',
          status: 200
        });
      } else {
        res.json({
          message:'This User already exsists.',
          status: 300
        });
      }
    });
});

router.post('/login', function(req, res, next){
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user){
      console.log("User not found");
      return res.status(401).json({
        message: "Login Failed, Please Try Again"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password,user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.json({
          message:'Login Successful',
          status: 200,
          jwt: token
        });
      } else {
        console.log('Wrong Password');
        res.json({
          message:'Wrong Password',
          status: 400
        });
      }
    }
  });
});

router.get('/profile', function(req, res, next){
  let token = getToken(req);
  if (token) {
      console.log(req.body)
      authService.verifyUser(token).then(user => {
          if(user){
              res.json({
                message: "User found successfully",
                status: 200,
                user
              })
          } else {
            res.json({
              message: "token invalid",
              status: 400
            })
          }
      });
  } else {
      res.json({
          message: "token not found",
          status: 400
      })
  }
});


router.get('/logout', function(res, req){
  res.cookie('jwt', "", {expires: new Date (0)});
  res.send('Logged Out');
});



function getToken(req) {
  console.log("Calling Token")
  let token = req.headers['authorization'];
  if (token) {
      if (token.startsWith('Bearer')) {
          token = token.slice(7, token.length)
      }
  }
  return (token) ? token : null;
}

// CRUD
// .post -> create
// .put -> update
// .get -> get one
// .get -> get all
module.exports = router;
