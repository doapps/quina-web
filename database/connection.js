const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
require('dotenv').config();

 const conn = {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      Promise: bluebird
}


module.exports = conn;
