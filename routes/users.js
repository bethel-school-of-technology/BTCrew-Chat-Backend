
    express = require('express'),
    router = express.Router();




    router.post('/signup', function(req, res, next) {
      res.locals.connection.query('insert into chatroom(firstName, lastName, userName, password) values('+req.body.firstName+','+req.body.lastName+', '+req.body.userName+', '+req.body.password+')', function (error, results, fields) {
          if(error) throw error;
          res.send(JSON.stringify(results));
    
      });
  });
      
      router.post('/login', function(req, res, next){
        models.users.findOne({
          where: {
            Username: req.body.username,
            Password: authService.hashPassword(req.body.password)
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