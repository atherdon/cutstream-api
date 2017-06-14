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

	User.find({ fields:'id' }).then(function(userIds){

		// console.log(userIds)
		var result = Object.keys(userIds).map(function(e) {
          return userIds[e].id;
        });

		// console.log(result);

		array.forEach(function(element, index){

			// console.log( element.userId =  );
			// element.userId = result;
			array[index].userId = result;
		})
        
	});


	console.log(array);

	


	// Video.create(array)
	// 	 .then(User.addVideos(videos))
	// 	 .catch(function(err){
	// 		throw err;
	// 	});



});