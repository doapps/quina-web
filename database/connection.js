const mysql = require('mysql2');
require('dotenv').config();

let conn;

function connect() {
  if (!conn) {
    conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
