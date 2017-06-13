'use strict';


module.exports = function(server) {

  var router = server.loopback.Router();
  var playerController = require('../controllers/player-controller');

	/* routers */
	router.get('/:id', videoController.getVideo);

	router.get('/edit/:id/', videoController.getVideoById);

	router.post('/update/', videoController.update);
	// router.get('mongotest', mainController.databaseConnect);

	server.use('/player', router);   

  

  server.use('/', router);

};