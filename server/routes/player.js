// var express  = require('express');
// var router   = express.Router();


// const util   = require('util');




// var Video    = require('../models/video');
var videoController = require('../controllers/player-controller');


module.exports = function(server) {
	var router  = server.loopback.Router();

	console.log(server);
	console.log(router);

	router.get('/:id', videoController.getVideo);

	router.get('/edit/:id/', videoController.getVideoById);

	router.post('/update/', videoController.update);
};

