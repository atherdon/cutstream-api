// var express  = require('express');
// var router   = express.Router();


// const util   = require('util');

// var http = require('http');

//models
// var Video    = require('../models/video');

var mainController = require('../controllers/main-controller');



module.exports = function(server) {
  var router  = server.loopback.Router();
  // var request = require('request');
  // var Video   = server.models.VideoModel;

  console.log(server);
  console.log(router);

  /* routers */
  router.get('/', mainController.getHomepage);

  router.post('/insert', mainController.postVideo);

  router.get('/example', mainController.getExample);    

  // router.get('mongotest', mainController.databaseConnect);

};


