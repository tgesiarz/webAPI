const connection = require('tedious').Connection;
const request = require('tedious').Request;
const types = require('tedious').TYPES;

const dbConfig = {
        userName: 'test',
        password: 'test',
        server: 'gęsiorki',
        options: {rowCollectionOnRequestCompletion : true}
    };

var exports = module.exports = {};

exports.executeSQL = (sql, callback) => {
  var conn = new connection(dbConfig);
  // on connection to the database
  conn.on('connect', function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log('connected to db');
      req = new request(sql, (err, rowCount, rows) => { callback(err, rowCount, rsJSON); conn.close(); } );
      // construct dynamic resultset
      var rsJSON = [];
      req.on('row', function(columns) {
        var rowJSON = {};
        columns.forEach(function(entry) {
          rowJSON[entry.metadata.colName] = entry.value;
        });
        rsJSON.push(rowJSON);
      });
      // execute SQL statement
      conn.execSql(req);
    }
  });
  // on connection close
  conn.on('end', () => {
    console.log('connection closed');
  });
}
