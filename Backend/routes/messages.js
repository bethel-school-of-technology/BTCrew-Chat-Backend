var express = require('express');
var router = express.Router();
let models = require('../models');
var authService = require('../services/auth');




// displays all messages from all users
router.get('/chatroom/public', function (req, res, next){
    models.messages.findAll({
        where: {
            Private: false
        }
    }).then( messagesfound => res.json({messages: messagesfound}));
});


router.get('/chatroom/profile', function(req, res, next){
    let token = req.cookies.jwt;
    console.log(req.body)
    authService.verifyUser(token).then(user => {
        if(user){
            models.messages.findAll({
                where : {
                    Sender: user.Username
                }
            }).then(messagesSent => {
                models.messages.findAll({
                    where: {
                        Recipient: user.Username
                    }
                }).then(messagesRecieved => {
                    res.json({
                        message: "List of Messages",
                        status: 200,
                        sent: messagesSent, 
                        recieved: messagesRecieved
                    })
                })
            })
        }
    });
});



router.post('/compose/public', function(req, res, next){
    let token = req.cookies.jwt;
    console.log(req.body)
    authService.verifyUser(token).then(user => {
        if(user){
            models.messages.create({
                    Sender: user.Username,
                    Recipient: req.body.Recipient,
                    Message: req.body.Message,
                    Private: false,
                    UserId: user.UserId
                }
            )
            .then(newMessage => {
                console.log(newMessage)
                if(newMessage){
                    res.json({
                        message: "Message Created!",
                        status: 200,
                        newMessage
                    });
                } else {
                    res.json({
                        message: "Message Failed to Send",
                        status: 400
                    });
                }
            })
        }
    });
});
// private message to another user

router.post('/compose/private', function(req, res, next){
    let token = req.cookies.jwt;
    console.log(req.body)
    authService.verifyUser(token).then(user => {
        if(user){
            models.messages.create({
                    Sender: user.Username,
                    Recipient: req.body.Recipient,
                    Message: req.body.Message,
                    Private: true,
                    UserId: user.UserId
                }
            )
            .then(newMessage => {
                console.log(newMessage)
                if(newMessage){
                    res.json({
                        message: "Message Created!",
                        status: 200,
                        newMessage
                    });
                } else {
                    res.json({
                        message: "Message Failed to Send",
                        status: 400
                    });
                }
            })
        }
    });
});




module.exports = router;