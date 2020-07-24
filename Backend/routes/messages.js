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
router.get('/compose', function (req, res, next) {
    res.render('messages', { title: 'Send a Message' });
});


router.post('/compose', function(req, res, next){
    let token = req.cookies.jwt;
    models.users
    authService.verifyUser(token).then(user => {
        if(user){
            models.messages.findOrCreate({
                where: {
                    UserId: User.Id,
                    MessagePublic: req.body.messagePublic
                }
            })
            .spread(function(result, created){
                if(created){
                    res.redirect('/messages/chatroom');
                } else {
                    res.send('Message Failed to Send');
                }
            })
        }
    });
});

// private message to another user


module.exports = router;