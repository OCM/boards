var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('tags');
});

module.exports = router;
