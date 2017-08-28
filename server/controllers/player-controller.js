'use strict';


var path     = require('path');

let server  = require(path.resolve(__dirname, '../server'));
var Video  = server.models.VideoModel;



exports.getVideo = function(req, res, next){
	var videoId = req.params.id;	
	// console.log(videoId);
  	// console.log(req.accessToken);
   //  console.log(req.accessToken.userId);
	
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

			console.log(video);

			// video.updateAttributes({
			// 	start: req.body.start,
			// 	end  : req.body.end
			// }, function(err, video){

			// 	console.log(req.body.start);
			// 	console.log(req.body.end);
			// 	console.log(video);

			// });

		}).catch(function(err){
			throw err;

			res.render('empty', { title: 'Error' });
		});

	// Video.updateAttributes({
	// 	id   : videoId,
	// 	start: req.body.start,
	// 	end  : req.body.end
	// }).then(function(video){

	// 	console.log(req.body.start);
	// 	console.log(req.body.end);
	// 	console.log(video);

	// 	// :todo add redirect to someone else page.

	// }).catch(function(err){
	// 	throw err;

	// 	res.render('empty', { title: 'Error' });
	// });

};


// @TODO remove when will be tested

// exports.getVideo = function(req, res, next){

//   var form = {},
//   error = null,
//   formFlash = req.flash('form'),
//   errorFlash = req.flash('error');

//   if (formFlash.length) {
//     form.email = formFlash[0].email;
//   }
//   if (errorFlash.length) {
//     error = errorFlash[0];
//   }
//   res.render(req.render, {
//     form: form,
//     error: error,
//     plans: plans
//   });

// };



// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}