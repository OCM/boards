var express = require('express');
var exphbs  = require('express-handlebars');
var body    = require('body-parser');
var morgan  = require('morgan');
var routes  = require('./routes.js');
var config  = require('../package.json').config;
var app     = express();

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.use(morgan('dev'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir:    __dirname + config.dirs.layouts,
    partialsDir:   __dirname + config.dirs.partials
}));
app.set('views', __dirname + config.dirs.views);
app.set('view engine', 'handlebars');

routes.forEach(function (route) {
    app.use(route.path, route.route);
});

app.listen(config.site.port, config.site.host, function () {
  console.log('Server live at %s:%d in %s mode',
    config.site.host, config.site.port, app.get('env'));
});
