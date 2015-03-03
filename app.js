/* Requirements */
var http     = require('http');
var express  = require('express');
var pg       = require('pg');
var path     = require('path'); // What is this for?
var config   = require('./config');

var port = 3000;
var host = '127.0.0.1';

var app = express();

//var conString = "pg://krishna:parashar@localhost:5432/OCM";


var knex = config.dbConfig;

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Link = bookshelf.Model.extend({
  tableName: 'links'
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags'
});

var Application = bookshelf.Model.extend({
  tableName: 'applications'
});

var Endpoint = bookshelf.Model.extend({
  tableName: 'endpoints'
});

app.listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');





/* Routing Modules */
var routes   = require('./routes');
var links    = require('./routes/links');
var tags     = require('./routes/tags');
var users    = require('./routes/users');
// var permissions = require('./routes/applications');
// var applications = require('./routes/applications');
//var scope = require('./routes/endpoints');



/* ROUTING
app.get('/', routes.index);
app.get('/users', users.list);


app.get('/', routes.index);
app.get('/signup', routes.signup);
app.post('/signup', routes.completesignup);
app.get('/signin', routes.signin);
app.post('/login', routes.dologin);
app.get('/signout', routes.signout);
app.get('/profile', routes.auth, routes.profile);
app.post('/profile', routes.auth, routes.updateprofile);
app.get('/order', routes.auth, routes.order);
app.get('/orderList', routes.auth, routes.orderList);
app.post('/orderConfirm', routes.auth, routes.orderconfirm);
app.get('/orderExecute', routes.auth, routes.orderExecute);
*/
