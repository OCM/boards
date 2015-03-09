
/* Requirements */
var http       = require('http');
var express    = require('express');
var bodyParser = require('body-parser');
var pg         = require('pg');
var path       = require('path');
var config     = require('./database/config');
var _          = require('lodash');


/* Declarations */
var host      = '127.0.0.1';
var port      = 3000;
var app       = express();
var knex      = config.dbConfig;
var bookshelf = config.bookshelf;
var router    = express.Router();


/* Body Parser Middleware */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 


/* Models */
var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  submissions: function () {
  	return this.belongsTo(Link);
  },
  roles: function () {
  	return this.belongsTo(Role);
  }
});

var Link = bookshelf.Model.extend({
  tableName: 'links',
  hasTimestamps: true,

  tags: function () {
  	return this.belongsToMany(Tag);
  },
  submitter: function () {
  	return this.belongsTo(Tag);
  }
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  links: function () {
  	return this.belongsToMany(Link);
  },
  submitter: function () {
  	return this.belongsTo(User);
  }
});

var Role = bookshelf.Model.extend({
  tableName: 'roles'
});


/* Collections */
var Users = bookshelf.Collection.extend({
	model: User
});

var Links = bookshelf.Collection.extend({
	model: Link
});

var Tags = bookshelf.Collection.extend({
	model: Tags
});

var Roles = bookshelf.Collection.extend({
	model: Role
});


  /* User Routing */
  router.route('/users')
    .get(function (req, res) {
      Users.forge()
      .fetch()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

  router.route('/users/:id')
    .get(function (req, res) {
      User.forge({id: req.params.id})
      .fetch()
      .then(function (user) {
        if (!user) {
          res.status(404).json({error: true, data: {}});
        }
        else {
          res.json({error: false, data: user.toJSON()});
        }
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

    .post(function (req, res) {
      User.forge({
        name: req.body.name,
        password: req.body.email,
        email: req.body.email
      })
      .save()
      .then(function (user) {
        res.json({error: false, data: {id: user.get('id')}});
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      }); 
    });



    // update user details
    .put(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.save({
          name: req.body.name || user.get('name'),
          email: req.body.email || user.get('email'),
          bio: req.body.bio   || user.get('bio'),
          website: req.body.website || user.get('website')
        })
        .then(function () {
          res.json({error: false, data: {message: 'User Updated'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })

    // delete a user
    .delete(function (req, res) {
      User.forge({id: req.params.id})
      .fetch({require: true})
      .then(function (user) {
        user.destroy()
        .then(function () {
          res.json({error: true, data: {message: 'User Deleted'}});
        })
        .otherwise(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })
      .otherwise(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    });




/* Routing */
// var routes   = require('./routes');
// var links    = require('./routes/links');
// var tags     = require('./routes/tags');
// var users    = require('./routes/users');
// var roles    = require('./routes/roles');
// var permissions  = require('./routes/applications');
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

app.use('/', router);
app.listen(port, host);
console.log('Server running at %d:%d in %s mode', host, port, app.get('env'));
