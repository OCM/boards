var express    = require('express');
var exphbs     = require('express-handlebars');
var bodyParser = require('body-parser');
var morgan     = require('morgan')
var routes     = require('./routes/routes.js');

// Define basic variables and initialize the app
var host      = '127.0.0.1';
var port      = 3000;
var app       = express();

// Set middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'))

// Configure handlebars
var handlebars_config = {
    defaultLayout: 'main',
    layoutsDir:    __dirname + '/views/layouts',
    partialsDir:   __dirname + '/views/partials'
};
app.engine('handlebars', exphbs(handlebars_config));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Attach all routes defined in routes/routes.js
routes.forEach(function (route) {
    app.use(route.path, route.route);
});

// Turn on the application
app.listen(port, host, function () {
  console.log('Server live at %s:%d in %s mode', host, port, app.get('env'));
});
