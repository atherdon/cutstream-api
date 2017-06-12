(function (routeConfig) {

  'use strict';

  routeConfig.init = function (server) {

    // *** routes *** //
	const index  = require('./routes/index');
	const player = require('./routes/player');

    // *** register routes *** //  
    server.use('/', index);
	server.use('/player', player);


  };

})(module.exports);