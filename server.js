var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport")
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
var flash = require('express-flash');
var PORT = process.env.PORT || 3000;

var app = express();

var options = { //this will go in the .env
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE//,
};



var sessionStore = new MySQLStore(options);

var test = 0

//include the models
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(flash());


app.use(session({ secret: 'keyboard cat', store: sessionStore, resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());

var authRoute = require('./routes/authRoute.js')
authRoute(app, passport);
var gameRoute = require('./routes/gameRoute.js')
gameRoute(app, passport);

require('./controllers/passportController.js')(passport, db.user);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
  });
});