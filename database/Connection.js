const mysql = require('mysql');
require('dotenv').config();

let conn;

function connect() {
  if (!conn) {
    conn = mysql.createConnection({
      host: '',
      user: 'root',
      password: 'root',
      database: 'judas',
      multipleStatements: true,
    });
    conn.connect((err) => {
      if (err) {
        console.log(`error al conectar: ${err}`);
      }
    });
  }
  return conn;
}

module.exports = connect();
