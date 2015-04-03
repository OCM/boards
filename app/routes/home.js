var express = require('express');
var pg      = require('pg-promise')();
var config  = require("../../db.json");
var router  = express.Router();
var db      = pg(config);

router.get('/', function(req, res) {
  db.connect()
    .then(function (conn) {
      return conn.query('SELECT title FROM links;');
    }, function (reason) {
      console.log(reason);
    })
    .then(function (data) {
      res.render('home', {links: data});
    }, function (reason) {
      console.log(reason);
    })
    .done();
});

module.exports = router;
