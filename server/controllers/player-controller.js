'use strict';


var path     = require('path');

let server  = require(path.resolve(__dirname, '../server'));
var Video  = server.models.VideoModel;



exports.getVideo = function(req, res, next){
	var videoId = req.params.id;	
	
	Video.findById(videoId)
		.then(function(video){
			// console.log(video);
			if(video){
				res.render('player-only', video );	
			}
			

		}).catch(function(err){
			// if (err) {
				res.render('empty', { title: 'Error' });
				throw err;
			// }
			
		});  
};

exports.getVideoById = function(req, res, next){
	var videoId = req.params.id;

	Video.findById(videoId)
		.then(function(video){

			// console.log(video);

			if(video){
				//:todo change to sending maybe two objects, 
				// or calculate duration by youtube on page instead
				res.render('edit', video ); 	
			}
			


		}).catch(function(err){
			// if(err){
				res.render('empty', {
				 	title: 'Error' 
				});
				// throw err;
			// }

		}); 


};


exports.update = function(req, res, next){

	// console.log( req.body.id );

	var videoId = req.body.id;

	Video.findById(videoId)
		.then(function(video){

			video.updateAttributes({
				start: req.body.start,
				end  : req.body.end
			}, function(err, video){

				// console.log(req.body.start);
				// console.log(req.body.end);
				// console.log(video);

				res.redirect('/index');

			});

		}).catch(function(err){
			throw err;

			res.render('empty', { title: 'Error' });
		});


};


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}