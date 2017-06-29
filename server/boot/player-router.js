'use strict';


module.exports = function(server) {

  var router = server.loopback.Router();
  var playerController = require('../controllers/player-controller');
  
// 	var Video2   = server.models.VideoModel;
// 	/* routers */
// 	router.get('/:id',       function(req, res, next){
// 	var videoId = req.params.id;	
// 	console.log(videoId);
//   	// console.log(req.accessToken);
//    //  console.log(req.accessToken.userId);
	
// 	Video2.findById(videoId)
// 		.then(function(err, videos){

// 			// console.log(videos);
// 			// if (err) res.render('empty', { title: 'Error' });


// 			// res.render('player-only', video );

// 		});  
// });

	router.get('/:id',       playerController.getVideo2);

	router.get('/edit/:id/', playerController.getVideoById);

	router.post('/update/',  playerController.update);
	// router.get('mongotest', mainController.databaseConnect);

	server.use('/player', router);   

  

  server.use('/', router);

};