'use strict';


module.exports = function(server) {

  var router = server.loopback.Router();
  var playerController = require('../controllers/player-controller');

	/* routers */
	router.get('/:id',       playerController.getVideo);

	router.get('/edit/:id/', playerController.getVideoById);

	router.post('/update/',  playerController.update);
	// router.get('mongotest', mainController.databaseConnect);

	server.use('/player', router);   

  

  server.use('/', router);

};