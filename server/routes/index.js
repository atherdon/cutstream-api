var express  = require('express');
// var router   = express.Router();


const util   = require('util');

// var http = require('http');

//models
// var Video    = require('../models/video');

var mainController = require('../controllers/main-controller');



console.log( app );

console.log( app.router );

/* routers */
app.router('/')
   .get(mainController.getHomepage);

app.router('/insert')
   .post(mainController.postVideo);

app.router('/example')
   .get(mainController.getExample);

app.router('/mongotest')
   .get(mainController.databaseConnect);

        


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}