const express = require('express');
const conn = require("../models/mysql_connection");

const app = express.Router();

app.get("/", (req, res) => {
    conn.query("SELECT * FROM Spring2019_Persons", (err, data) => {
        if(err) throw err;
        res.send(data);
    })    
});


module.exports = app;