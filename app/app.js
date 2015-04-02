var express    = require('express');
var bodyParser = require('body-parser');
var routes     = require('./routes/routes.js');

// Define basic variables and initialize the app
var host      = '127.0.0.1';
var port      = 3000;
var app       = express();

// Set bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure handlebars
var handlebars_config = {
    defaultLayout: 'main',
    extname:       '.hbs',
    layoutsDir:    './templates/layouts',
    partialsDir:   './templates/partials'
};
app.engine('handlebars', exphbs(handlebars_config));
app.set('views', './templates');
app.set('view engine', 'handlebars');

// Attach all routes defined in routes/routes.js
routes.forEach(function (route) {
    app.use(route.path, route.route);
});

// Turn on the application
app.listen(port, host, function () {
  console.log('Server live at %s:%d in %s mode', host, port, app.get('env'));
});
