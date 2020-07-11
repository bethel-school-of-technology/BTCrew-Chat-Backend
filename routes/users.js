let models = require("../models");
let express = require("express");
let router = express.Router();

router.get('/', function(req, res, next){
    res.send("Get All");
});

router.get('/', function(req, res, next){
    res.send("Get All");

});



module.exports = router;