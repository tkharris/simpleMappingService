// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://localhost/MeanMapApp");

require('./config/passport')(passport); // pass passport for configuration

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(cookieParser());                                        // read cookies (needed for auth)
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

app.set('view engine', 'ejs');

// required for passport
app.use(session({
  secret: 'BANANAcobana',
  cookie: {path: '/', httpOnly: false, secure: false, maxAge: null}
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app, passport);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

var ws = require("nodejs-websocket");
var placer = require('./app/placer.js');
var server = ws.createServer(function(conn){
  console.log("New connection");
  conn.on("text", function (str) {
    console.log("Received "+str);
    placer.place(JSON.parse(str).userData);
    conn.sendText(str.toUpperCase()+"!!!");
  });
  conn.on("error", function (errObj) {
    console.log("Error: " + errObj);
  });
  conn.on("close", function (code, reason) {
    console.log("Connection closed");
  });
}).listen(3001)
console.log('WebSockets listening on port ' + 3001);
