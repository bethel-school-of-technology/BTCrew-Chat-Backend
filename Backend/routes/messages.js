var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
// var getToken = require('express-bearer-token');




// displays all messages from all users
router.get('/chatroom/public', function (req, res, next) {
    models.messages.findAll({
        where: {
            Private: false
        }
    }).then(messagesfound => res.json({ messages: messagesfound }));
});

router.get('/chatroom/profile', async function (req, res, next) {
    let token = getToken(req);
    if (token) {
        let user = await authService.verifyUser(token)
        if (user) {
            models.messages.findAll({
                where: {
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
            });
        }
    } else {
        res.json({
            message: "token not found",
            status: 400
        })
    }
});

router.post('/compose/public', async function (res, res, next) {
    let token = getToken(req);
    if (token) {
        let user = await authService.verifyUser(token);
        if (user) {
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
                    if (newMessage) {
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
    } else {
        res.json({
            message: "token not found",
            status: 400
        })
    }
});

// private message to another user
router.post('compose/private', async function (res, req, next) {
    let token = getToken(req);
    if (token) {
        let user = await authService.verifyUser(token);
        if (user) {
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
                    if (newMessage) {
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
    } else {
        res.json({
            message: "token not found",
            status: 400
        })
    }
})


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


module.exports = router;