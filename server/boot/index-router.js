'use strict';


module.exports = function(server) {
  
  var router = server.loopback.Router();
  var mainController = require('../controllers/main-controller');
  
  
  // @TODO change this later. But right we're using this as is
  // var indexRoutes = require('../routes/index');
  // server.use('/', indexRoutes);

  // var PlayerRoutes = require('../routes/player');
  // server.use('/player', PlayerRoutes);
  // console.log(server);
  // console.log(router);

  /* routers */
  router.get('/', mainController.getHomepage);

  router.post('/insert', mainController.postVideo);

  router.get('/example', mainController.getExample);    

  // router.get('mongotest', mainController.databaseConnect);

  server.use('/', router);


};