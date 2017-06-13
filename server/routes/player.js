'use strict';


//models
// var Video   = server.models.VideoModel;

var playerController = require('../controllers/player-controller');


module.exports = function(server) {
	var router  = server.loopback.Router();

	console.log(server);
	console.log(router);
	
	/* routers */
	router.get('/:id', videoController.getVideo);

	router.get('/edit/:id/', videoController.getVideoById);

	router.post('/update/', videoController.update);

	server.use('/player', router);
	// return router;
};

