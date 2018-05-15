const mysql = require('mysql');
require('dotenv').config();

let conn;

function connect() {
  if (!conn) {
    conn = mysql.createConnection({
      host: conn.DB_HOST,
      user: conn.DB_USERNAME,
      password: conn.DB_PASSWORD,
      database: conn.DB_DATABASE,
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
