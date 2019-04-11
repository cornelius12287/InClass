const express = require("express");
const path = require("path");
const users = require("./controllers/users");
const userModel = require('./models/user');
//add others controllers HERE for all tables

const app = express();
const port = 3000;

// MIDDLE WEAR
// below is cors adding response headers, telling browser to leave security to us
app.use(function(req, res, next) {
  try {
    const token = (req.headers.authorization || "").split(' ')[1]
    req.user = userModel.getFromToken(token);
  }
  catch (error) {
    const openActions = ['POST/users', 'POST/users/login']
    if(req.method != 'OPTIONS' && !openActions.includes(req.method, + req.path)){
      next(Error("Login Required"));
    }
  }
  next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
    next();
  });

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../NoFramework")));
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/users", users);

app.use(function (err, req, res, next){
    console.error(err.stack)
    res.status(500).send({msg: err.message});
});

app.listen(port, () => console.log(`Example app http://localhost:${port}`));