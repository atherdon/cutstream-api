(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
	const index  = require('./routes/index');
	const player = require('./routes/player');

    // *** register routes *** //  
    app.use('/', index);
	app.use('/player', player);


  };

})(module.exports);