const mysql = require('mysql');
require('dotenv').config();

let conn;

function connect() {
  if (!conn) {
    conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: 'root',
      password: '',
      database: 'judas',
    });
    conn.connect((err) => {
      if (err) {
        console.log(`-> error_db_connect: ${err}`);
      }
    });
  }
  return conn;
}

module.exports = connect();
