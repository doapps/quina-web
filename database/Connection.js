const mysql = require('mysql');
let conn;

function connect() {
    if (!conn) {
        conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'judas'
          });
        conn.connect((err) => {
            if (err)
                console.log('error al conectar ' + err);
        });
    }  
    return conn;
}

module.exports = connect();