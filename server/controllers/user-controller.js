'use strict';


var path     = require('path');

let server  = require(path.resolve(__dirname, '../server'));

var Video   = server.models.VideoModel;
var User    = server.models.UserModel;
var Email   = server.models.EmailModel;


exports.getVideo = function(req, res, next){
	// var videoId = req.params.id;	
	// // console.log(videoId);
 //  	// console.log(req.accessToken);
 //   //  console.log(req.accessToken.userId);
	
	// Video.findById(videoId)
	// 	.then(function(video){
	// 		// console.log(video);
	// 		if(video){
	// 			res.render('player-only', video );	
	// 		}
			

	// 	}).catch(function(err){
	// 		// if (err) {
	// 			res.render('empty', { title: 'Error' });
	// 			throw err;
	// 		// }
			
	// 	});  
};

exports.verified = function(req, res, next){

	res.render('account/verified');

};