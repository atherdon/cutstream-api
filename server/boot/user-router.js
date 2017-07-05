'use strict';


module.exports = function(server) {
  
  var router = server.loopback.Router();
  var notificationsController = require('../controllers/notifications-controller');
  
  /* routers */
  router.get('/verified',    notificationsController.verified);

  // router.post('/insert',     mainController.postVideo);

  // router.get('/example/:id', mainController.getExample);    

  // server.use('/', router);


};