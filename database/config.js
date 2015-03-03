var dbConfig = {
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'krishna',
    password : '',
    database : 'OCM',
    charset  : 'utf8'
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = {
  dbConfig: knex,
  bookshelf: bookshelf
};
