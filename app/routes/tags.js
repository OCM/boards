var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('tags', {title: 'Tags'});
});

module.exports = router;
