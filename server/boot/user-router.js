'use strict';


module.exports = function(server) {
  
  var router = server.loopback.Router();
  var userController = require('../controllers/user-controller');
  
  /* routers */
  router.get('/verified',    userController.verified);

  // router.post('/insert',     mainController.postVideo);

  // router.get('/example/:id', mainController.getExample);    

  // server.use('/', router);


};