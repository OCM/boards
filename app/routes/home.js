var express = require('express');
var pg      = require('pg');
var router  = express.Router();

var db   = require("../../db.json");
var conn = "postgres://" + db.user + ":" + db.pass + "@localhost/atrus";

router.get('/', function(req, res) {
  pg.connect(conn, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT title FROM links;', function (err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      res.render('home', {links: result.rows});
      client.end();
    });
  });
});

module.exports = router;
