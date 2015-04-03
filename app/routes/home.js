var express = require('express');
var db      = require('../db');
var router  = express.Router();

router.get('/', function(req, res) {
  db.query("SELECT title FROM links;", function (err, data) {
    if (err) {
      console.log(reason);
      return;
    }
    res.render('home', {links: data});
  });
});

module.exports = router;
