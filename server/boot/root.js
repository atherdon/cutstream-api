'use strict';


module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  server.use(router);
  
  // @TODO change this later. But right we're using this as is
  var indexRoutes = require('../routes/index');
  server.use('/', indexRoutes);

  var PlayerRoutes = require('../routes/player');
  server.use('/player', PlayerRoutes);

};
