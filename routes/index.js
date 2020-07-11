var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
let models = require("./../models")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "Jesus is God"})
});

module.exports = router;