'use strict';

var path        = require('path');

let app         = require(path.resolve(__dirname, '../server/server'));

let accounts    = require(path.resolve(__dirname, 'sample-users-data'));

let videos      = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;

var Video       = app.models.VideoModel;


// accounts(function(array){

// 	User.create(array)
// 		.then(function(users){
// 			// console.log(users);

// 			User.assign();

				

// 		})
// 		.catch(function(err){
// 			throw err;
// 		});

// });


videos(function(array){


	Video.create(array)
		 .then(User.addVideos(videos))
		 .catch(function(err){
			throw err;
		});



});