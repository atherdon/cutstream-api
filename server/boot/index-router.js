'use strict';


module.exports = function(server) {
  
  var router = server.loopback.Router();
  var mainController = require('../controllers/main-controller');
  
  /* routers */
  router.get('/',            mainController.getHomepage);

  router.post('/insert',     mainController.postVideo);

  router.get('/example/:id', mainController.getExample);    

  server.use(router);
  // server.use('/', router);


};