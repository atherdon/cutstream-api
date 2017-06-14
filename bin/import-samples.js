'use strict';

var path        = require('path');

let app         = require(path.resolve(__dirname, '../server/server'));

let accounts    = require(path.resolve(__dirname, 'sample-users-data'));

let videos      = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;
// var Role        = app.models.Role;
// var RoleMapping = app.models.RoleMapping;

var Video       = app.models.VideoModel;


accounts(function(array){



	User.create(array)
		.then(function(users){
			// console.log(users);

			User.assign();

			// User.findOne({fields:'id', where: { name:'admin' }})
			// 	.then(function(result){
					
			// 		Role.create({ name:'admin' })
			// 			.then(function(role){

			// 				role.principals.create({
			// 			        principalType: RoleMapping.USER,
			// 			        principalId: result.id
			// 			    }, function(err, principal){
			// 			    	console.log('Principal', principal);
			// 			    });
			// 			})
			// 			.catch(function(err){
			// 				throw err;
			// 			})
			// 	})		

		})
		.catch(function(err){
			throw err;
		});


});


videos(function(array){


	Video.create(array)
		 .then(//function(videos){
		 		//console.log(videos);
		 	//}
		 	User.addVideos(videos)) //User.addVideos(videos)
		 .catch(function(err){
			throw err;
		});



});