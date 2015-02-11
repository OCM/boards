/* Application: OCM API 
 * Author 1: Andrew Brinker
 * Author 2: Krishna Parashar
 * Last Updated: 6 Feburary 2015
 */


/* Requirements */
var express = require('express');
var http = require('http');
var path = require('path'); // What is this for?
var pg = require('pg');



/* Routing Modules */
var routes = require('./routes');
var users = require('./routes/users');
var links = require('./routes/links');

/* Unused Routing Modules
var tags = require('./routes/tags'); 
var applications = require('./routes/applications');
var endpoints = require('./routes/endpoints');
*/

var port = 3000;
var host = '127.0.0.1';

// var conString = "pg://krishna:parashar@localhost:5432/OCM";

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', users.list);














/*
http.createServer(app).listen(app.get('port'), function(){
  console.log(req);
  console.log('Express server listening on port ' + app.get('port'));
});
*/










/* Sequelize 
var Sequelize = require('sequelize');
var sequelize = new Sequelize('OCM', 'team', 'password', {
  dialect: "postgres",
  port:    5432,
});

sequelize
  .authenticate()
  .sync({ force: true })
  .complete(function (err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
*/

















/* http://nodeexamples.com/2012/09/21/connecting-to-a-postgresql-database-from-node-js-using-the-pg-module/
var client = new pg.Client(conString);
client.connect();

// client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
query.on("row", function (row, result) {
  result.addRow(row);
});
query.on("end", function (result) {
  console.log(JSON.stringify(result.rows, null, "    "));
  client.end();
});

app.listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
*/






















/* POSTGRES TEMPLATE: npm install pg

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });

});
*/

