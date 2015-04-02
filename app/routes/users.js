var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Users page');
});

module.exports = router;
