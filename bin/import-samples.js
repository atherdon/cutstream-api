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



	User.findOne({ fields:'id', where :{
      username: 'admin'
      } }).then(function(userId){

		// var result = Object.keys(userIds).map(function(e) {
  //          return userIds[e].id.toString();
  //       });
  
		console.log(result)
		array.forEach(function(element){

			element.userId = userId;

		})
        
        Video.create(array)
		 .then(function(videos){
		 	// console.log(videos);
		 })
		 .catch(function(err){
			// throw err;
		});

        	// console.log(array);

	});



});