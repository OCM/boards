var express = require('express');
var exphbs  = require('express-handlebars');
var db      = require('../db');
var router  = express.Router();


var hbs = exphbs.create({ 
    // Specify helpers which are only registered on this instance. 
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    }
});

function getLinks() {
    return db.query("SELECT title FROM links;", function (err, data) {
        if (err) {
        console.log(reason);
        return;
        }
    });
};


//app.get('/', findStudent, findGroups,  renderStudentsPage);
router.get('/', function (req, res, next) {

getLinks();
console.log(getLinks());
    res.render('home', {
        // TODO: If logged in show user
        //user: req.user

         showTitle: true,

        //links: data;
        helpers: {
            foo: function () { return 'foo.'; }, 
            bar: function () { return 'shit' }
        }
    });
	//return renderPage(req, res);
});

module.exports = router;

 /* 
function getDiscoveryLinks(req, res, next) {
	var query = "SELECT title FROM links;";

	db.query(query, function (err, data) {
		if (err ) {
			console.log(reason);
			return next(error);
		}
		req.links = data;
		//return next();
	});
}

function getUser(req, res, next) {
	var query = "SELECT title FROM links;";

	db.query(query, function (err, data) {
		if (err ) {
			console.log(reason);
			return next(error);
		}
		res.links = data;
		return next();
	});
}  */

/*
function renderPage(req, res) {
	getDiscoveryLinks();
    
};

module.exports = router;
module.exports = getDiscoveryLinks;
module.exports = renderPage;



*/



/*
  db.query("SELECT title FROM links;", function (err, data) {
    if (err) {
      console.log(reason);
      return;
    }
    res.render('home', {links: data});
  });
  
  //res.render('home');
*/


/*
function findStudent(req, res, next) {
    var dbRequest = 'SELECT * FROM Students WHERE IDCard = \'' + req.query['id'] + '\'';
    db.all(dbRequest, function(error, rows) {
        if(rows.length !== 0) {
            req.students = rows;
            return next();
        }

        res.render('incorrect_student');         
    });
}

function findStudent(req, res, next) {
    var dbRequest = 'SELECT * FROM Students WHERE IDCard = \'' + req.query['id'] + '\'';
    db.all(dbRequest, function(error, rows) {

        if (error || !rows.length) {
            return next(error);
        }

        req.students = rows;
        return next();
    });
};

function findGroups(req, res, next) {
    dbRequest = 'SELECT * FROM Groups WHERE Name = \'' + req.query['group'] + '\'';
        db.all(dbRequest, function(error, rows) {
            // Add selected data to previous saved data.
            req.groups = rows;
            next();
        }
    });
};*/


