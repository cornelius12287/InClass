const mysql = require("mysql");

//loads dotenv into environment variables
require("dotenv").load();

//const conn = mysql.createConnection();   expensive option
//always passes one parameter, which is an object containing multiple "parameters"/configuration
const conn = mysql.createPool({
    //provides an object with all an environment variables
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    insecureAuth: true
});

module.exports = conn;