var http       = require('http');
var express    = require('express');
var bodyParser = require('body-parser');
var pg         = require('pg');
var Lazy       = require('lazy.js');

var host      = '127.0.0.1';
var port      = 3000;

var app       = express();
var router    = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.send('hello world');
});

app.use('/', router);
app.listen(port, host, function () {
  console.log('Server live at %d:%d in %s mode', host, port, app.get('env'));
});
