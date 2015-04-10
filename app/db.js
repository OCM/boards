var pg     = require('pg-promise')();
var config = require("../db.json");
var db     = pg(config);

/**
 * @brief   Query the database
 * @details Make a SQL query to the PostgreSQL database, optionally passing
 *          parameters, and responding with a callback.
 *
 * @arg {string}   query      - A SQL query
 * @arg {string[]} [q_params] - List of parameters to the query
 * @arg {Function} cb         - Callback to be run on query completion
 */
exports.query = function (query, q_params, cb) {
  var params;
  if (arguments.length == 3) params = q_params;
  if (arguments.length == 2) cb = q_params;
  db.connect()
    .then(function (conn) { return conn.query(query, params); },
          function (err)  { cb(reason, null);                 })
    .then(function (data) { cb(null, data);                   },
          function (err)  { cb(err, null);                    })
    .done();
};
