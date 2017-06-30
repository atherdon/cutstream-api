'use strict';


module.exports = function(server) {

	var router = server.loopback.Router();
	var playerController = require('../controllers/player-controller');
	  

	router.get('/:id',       playerController.getVideo);

	router.get('/edit/:id/', playerController.getVideoById);

	router.post('/update/',  playerController.update);


	server.use('/player', router);   

};