var express = require('express');
var router = express.Router();
let models = require('../models');
var authService = require('../services/auth');




// displays all messages from all users
router.get('/chatroom', function (req, res, next){
    models.messages.findAll({
        where: {
            UserId: user.UserId,
            Sender: messages.Sender,
            MessagePublic: messages.MessagePublic,
        }
    }).then( result => res.json('messages', {messages: result}));
});


// create messages and send message
router.get('/chatroom/createMessage', function (req, res, next) {
    res.render('messages', { title: 'Send a Message' });
});


router.post('/chatroom/createMessage', function(req, res, next){
   models.messages.findOrCreate({
       where: {
           UserId: user.UserId,
           MessagePublic: req.body.MessagePublic
       }
   }) .spread (function(result, created){
       if (created){
           res.redirect('/chatroom');
       } else {
           res.send('Message Failed to Send');
       }
   });
});


// private message to another user


module.exports = router;