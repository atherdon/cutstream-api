'use strict';


var mainController = require('../controllers/main-controller');


module.exports = function(server) {

  // console.log(server);
  
  var router  = server.loopback.Router();

  // var Video   = server.models.VideoModel;

  console.log(server);
  console.log(router);

  /* routers */
  router.get('/', mainController.getHomepage);

  router.post('/insert', mainController.postVideo);

  router.get('/example', mainController.getExample);    

  // router.get('mongotest', mainController.databaseConnect);

  server.use('/', router);
  // return router;

};


