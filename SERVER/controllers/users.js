// one controller file for each table in database

const express = require('express');
const user = require('../models/user');
//const conn = require('../models/mysql_connection');

const app = express.Router();

// get action/method/request
// this method used instead of sequelize from video
// controller does not know about sequel; model does not know about express
app.get("/", (req, res) => {

    user.getAll((err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.get("/:id", (req, res) => {

    user.get(req.params.id, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.post("/", (req, res) => {
    //user.add({FirstName: "Steve", LastName: "Irwin"}, (err, data) => {
    console.log(req.body);
    user.add(req.body, (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

// return value
module.exports = app;