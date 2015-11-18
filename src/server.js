// *******************************************************
// SERVER VARIABLES
// *******************************************************
var express = require('express'),
path = require('path'),
app = express(),
port = 8000,
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));

// *******************************************************
// STATIC DIRECTORY SETUP
// *******************************************************
app.use(express.static(path.join(__dirname, 'public')));

// get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  next(); // make sure we go to the next routes and don't stop here
});

app.use('/', router);

// *******************************************************
// ERROR HANDLING
// *******************************************************

// errorhandler
app.use(function(err, req, res, next) {
  //console.error(err);
  console.error(err.stack);

  res.status(err.status);
  res.send({status: err.status, message: err.message || '** no unicorns here **'});
});



app.get('*', function(req, res) {
    console.log(req.path);
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});

module.exports = app;
