var config = require('./database/config'),
    schema = require('./database/schema'),
    sequence = require('when/sequence'),
    _ = require('lodash'),
    schemaTables  = _.keys(schema),
    knex = config.dbConfig;



// Borrowed from https://github.com/morficus/Ghost/blob/c985c5ed28a4da09b161b71f3526eb228a43dada/core/server/data/migration/index.js
function createTable(table) {
  return knex.schema.createTable(table, function (t) {
    var column,
      columnKeys = _.keys(schema[table]);
    _.each(columnKeys, function (key) {
      if (schema[table][key].hasOwnProperty('maxlength')) {
        column = t[schema[table][key].type](key, schema[table][key].maxlength);
      } else {
        column = t[schema[table][key].type](key);
      }
      if (schema[table][key].hasOwnProperty('nullable') && schema[table][key].nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }
      if (schema[table][key].hasOwnProperty('primary') && schema[table][key].primary === true) {
        column.primary();
      }
      if (schema[table][key].hasOwnProperty('unique') && schema[table][key].unique) {
        column.unique();
      }
      if (schema[table][key].hasOwnProperty('unsigned') && schema[table][key].unsigned) {
        column.unsigned();
      }
      if (schema[table][key].hasOwnProperty('references') && schema[table][key].hasOwnProperty('inTable')) {
        //check if table exists?
        column.references(schema[table][key].references);
        column.inTable(schema[table][key].inTable);
      }
      if (schema[table][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(schema[table][key].defaultTo);
      }
    });
  });
}

function deleteTable(table) {
  return knex.schema.dropTableIfExists(table);
}


function createTables () {
  var tables = [];
  tables = _.map(schemaTables, function (table) {
    return function () {
       return createTable(table);
    };
  });
  return sequence(tables);
}

createTables()
.then(function() {
	console.log('Tables created!');
	process.exit(0);
})
.otherwise(function (error) {
	throw error;
});
