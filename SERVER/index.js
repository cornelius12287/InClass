const express = require("express");
const path = require("path");
const users = require("./controllers/users");
const userModel = require('./models/user');
//add others controllers HERE for all tables

const app = express();
const port = 3000;

// MIDDLE WEAR
// below is cors adding response headers, telling browser to leave security to us

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "../dist")));

//AUTHORIZATION
app.use(function(req, res, next) {
  try {
    const token = (req.headers.authorization || "").split(' ')[1]
    req.user = userModel.getFromToken(token);
  }
  catch (error) {
    const openActions = ['POST/users', 'POST/users/login', 'GET/myfriends', 'GET/register', 'GET/login', 'GET/about']
    if(req.method != 'OPTIONS' && !openActions.includes(req.method, + req.path.toLowerCase)){
      next(Error("Login Required"));
    }
  }
  next();
});

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../NoFramework")));

app.use("/users", users);

//CATCH ALL FOR DEEP LINKING: not matter what is asked for, return index.html
app.get("*", (req, res)=> res.sendFile(path.join(__dirname, "../dist/index.html")));

//ERROR HANDLING
app.use(function (err, req, res, next){
    console.error(err.stack)
    res.status(500).send({ message: err.message });
});

app.listen(port, () => console.log(`Example app http://localhost:${port}`));