'use strict';


// var Video    = require('../models/mongoose/video');
// var loopback   = require('loopback');
// var server     = loopback();

// var Video2   = server.models.VideoModel;	
// console.log(server.models.UserModel);


var path     = require('path');

let server  = require(path.resolve(__dirname, '../server'));
var Video2  = server.models.VideoModel;
// console.log(database);


exports.getVideo2 = function(req, res, next){
	var videoId = req.params.id;	
  	// console.log(req.accessToken);
   //  console.log(req.accessToken.userId);
	
	Video2.findById(videoId)
		.then(function(err, videos){

			console.log(videos);
			// if (err) res.render('empty', { title: 'Error' });


			// res.render('player-only', video );

		});  
};

exports.getVideoById2 = function(req, res, next){
	var videoId = req.params.id;

	Video2.findById(videoId)
		.then(function(err, videos){

			console.log(videos);

			// if (err) res.render('empty', { title: 'Error' });
				// res.send(err);

			// console.log(videos)	;

			// video.duration = req.params.duration;

			// res.render('edit', video ); //@todo change to sending maybe two objects, or calculate duration by youtube on page instead


		}); 


};


exports.update = function(req, res, next){
	console.log( req.body.id );
	var videoId = req.body.id;
	Video2.upsert({
		id: videoId,
		start: req.body.start,
		end: req.body.end
	}).then(function(err, video){

		if (err) 
			res.render('empty', { title: 'Error' });
	});

};


exports.getVideo = function(req, res, next){


	Video.findById( req.params.id, function(err, video) {

		if (err) res.render('empty', { title: 'Error' });
				// res.send(err);

			res.render('player-only', video );

	});


};

exports.getVideoById = function(req, res, next){

	// console.log(util.inspect( req.params, false, null ));	
	//@TODO change to bluebird version with async
	// Todo.findAsync()
	//      .then(function(todos) {
	//        res.render('todos', {title: 'Todos', todos: todos});
	//      })
	//      .catch(next)
	//      .error(console.error);
 	Video.findById( req.params.id, function(err, video) {

		if (err) res.render('empty', { title: 'Error' });
				// res.send(err);

		console.log(video)	;

			// video.duration = req.params.duration;

		res.render('edit', video ); //@todo change to sending maybe two objects, or calculate duration by youtube on page instead

	

			

	});

};

exports.update = function(req, res, next){

	//@todo receive only update form values
	// console.log(util.inspect( req.params, false, null ));	
	console.log(util.inspect( req.body, false, null ));
	console.log( req.body.id );

	const id = req.body.id;
	//@TODO change to bluebird version with async
	// http://stackoverflow.com/questions/30915942/how-to-do-a-findoneandupdate-with-bluebird-promises-mongoose
	Video.findOneAndUpdate({_id:id}, {start: req.body.start, end:req.body.end}, {}, function(err, video){
		//@todo add thank you for using our service
		// res.redirect("index"); //@todo test title
		// res.render('index', { title: 'CutStream | Start & End point for your video' });
		if (err) 
			res.render('empty', { title: 'Error' });
		
	});


 

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