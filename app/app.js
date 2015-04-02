var express    = require('express');
var bodyParser = require('body-parser');
var routes     = require('./routes/routes.js');

var host      = '127.0.0.1';
var port      = 3000;
var app       = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', './templates');
app.set('view engine', 'handlebars');

routes.forEach(function (route) {
    app.use(route.path, route.route);
});

app.listen(port, host, function () {
  console.log('Server live at %s:%d in %s mode', host, port, app.get('env'));
});
