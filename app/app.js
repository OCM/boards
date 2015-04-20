var express = require('express');
var exphbs  = require('express-handlebars');
var body    = require('body-parser');
var morgan  = require('morgan');
var routes  = require('./routes.js');
var config  = require('../package.json').config;
var app     = express();

var hbs_config = {
  defaultLayout: config.defaultLayout,
  layoutsDir:    config.dirs.layouts,
  partialsDir:   config.dirs.partials
};

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.use(morgan('dev'));
app.engine('handlebars', exphbs(hbs_config));
app.set('views', config.dirs.views);
app.set('view engine', 'handlebars');
app.use(express.static(config.dirs.public));

routes.forEach(function (route) {
  app.use(route.path, route.route);
});

app.listen(config.site.port, config.site.host, function () {
  console.log('Running: "%s:%d" in %s mode',
    config.site.host, config.site.port, app.get('env'));
});
