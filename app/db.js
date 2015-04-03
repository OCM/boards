var pg     = require('pg-promise')();
var config = require("../db.json");
var db     = pg(config);

exports.query = function (query, q_params, cb) {
  var params;
  if (arguments.length == 3) params = q_params;
  if (arguments.length == 2) cb = q_params;
  db.connect()
    .then(function (conn) {
      return conn.query(query, params);
    }, function (reason) {
      console.log(reason);
    })
    .then(function (data) {
      cb(data);
    }, function (reason) {
      console.log(reason);
    })
    .done();
};
