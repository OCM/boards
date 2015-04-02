var express = require('express');
var pg      = require('pg-promise')();
var config  = require("../../db.json");
var router  = express.Router();
var db      = pg(config);

router.get('/', function(req, res) {
  db.connect()
    .then(function (conn) {
      // Connection succeeded
      return conn.query('SELECT title FROM links;');
    }, function (reason) {
      // Connection failed
      console.log(reason);
    })
    .then(function (data) {
      // Query succeeded
      res.render('home', {links: data});
    }, function (reason) {
      // Query failed
      console.log(reason);
    })
    .done();
});

module.exports = router;
