var express = require('express');
var router = express.Router();

var db   = require("../../db.json");
var conn = "postgres://" + db.user + ":" + db.pass + "@localhost/atrus";

router.get('/', function(req, res) {
  res.render('home', {name: 'Andrew'});
});

module.exports = router;
