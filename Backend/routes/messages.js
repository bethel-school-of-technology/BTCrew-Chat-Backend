var express = require('express');
var router = express.Router();
let models = require('../models');
var authService = require('../services/auth');





router.post('/', function (req, res, next){
    models.messages.findAll().then(messages => {
        res.json(messages)
    })
});

router.get('/:id', function(req, res, next){
    models.messages.findByPk(parseInt(req.params.id)).then(message =>{
        res.json(message)
    })
});



module.exports = router;