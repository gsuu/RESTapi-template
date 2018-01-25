// server.js
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");

// express middleware
var morgan = require("morgan"); // logger
var flash = require("connect-flash"); // db나 파일에 저장되지 않고 뷰전체에서 데이터를 유지하는 방법
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");

// etc packages
var moment = require("moment");

// config
var port = process.env.PORT || 8080;
var configDB = require("./config/database.js");

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// required for passport
app.use(
  session({
    secret: "ilovescotchscotchyscotchscotch", // session secret
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./app/routes/index.js")(app, passport); // load our routes and pass in our app and fully configured passport
require("./app/routes/auth.js")(app, passport);
require("./app/routes/board.js")(app);

// launch ======================================================================
app.listen(port);
console.log("The magic happens on port " + port);
