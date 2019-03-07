const express = require("express");
const path = require("path");
const users = require("./controllers/users");
//add others controllers HERE for all tables

const app = express();
const port = 3000;

// MIDDLE WEAR
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../NoFramework")));
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/users", users);

app.listen(port, () => console.log(`Example app http://localhost:${port}`));