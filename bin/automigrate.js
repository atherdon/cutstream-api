'use strict';


var path        = require('path');

let app         = require(path.resolve(__dirname, '../server/server'));
var database    = app.datasources.videoDS;

// var async       = require('async');

// var Promise     = require('bluebird');

// let accounts    = require(path.resolve(__dirname, 'sample-users-data'));

// let videos      = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;
var Role        = app.models.Role;
var RoleMapping = app.models.RoleMapping;

var Video       = app.models.VideoModel;


//creating loopback necessary tables if no exists
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'UserModel', 'VideoModel'];
database.automigrate(lbTables, function(err) {
// database.autoupdate(lbTables, function(err) {	
  if (err) throw err;

  console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
  database.disconnect();
});

// database.automigrate('UserModel', function(err){
// 	if (err) throw err;
	
// 	// database.disconnect();
// });

// database.automigrate('VideoModel', function(err){
// 	if (err) throw err;
	
// 	// database.disconnect();
// })

// database.automigrate('UserModel', function(err) {
// 	if (err) throw err;


// 	accounts(function(array){

// 		array.forEach(function(element) {

// 			User.findOrCreate({
// 		      where: {
// 		        name: element.name,
// 		        email: element.email,
// 		      }
// 		    }, element)
// 		    .then(function(user){
// 		    	// assign admin role to admin user
// 		    	if(user[0].name == 'admin'){
		    	
// 		    		var obj = { name: 'admin' };

// 		    		Role.findOrCreate({where:obj}, obj).then(function(role){
// 		    			if(!role){
// 		    				role[0].principals.create({
// 						        principalType: RoleMapping.USER,
// 						        principalId: user[0].id 
// 						    })
// 						    .then(function(principal){
// 						    	console.log('Principal:', principal);
// 						    }).catch(function(err){
// 						      	throw err;
// 						    });
// 						}
// 		    		});

		    		
// 		    	}
// 		    })
// 		    .catch(function(err){
// 		    	throw err;
// 		    })


// 		});

// 	});
// database.disconnect();

// });


// database.automigrate('UserModel', function(err) {
// 	if (err) throw err;


// 	accounts(function(array){

// 		array.forEach(function(element) {
// 	    User.findOrCreate({
// 	      where: {
// 	        name: element.name,
// 	        email: element.email,
// 	      }
// 	    }, element,
// 	    function (err, user) {
// 	  

// 	      if (user.name == 'admin'){
//       		// create the admin role

//       			// console.log(user.id);
//       			var roleObject = {
//       				name: 'admin'
//       			};

//       			Role.findOrCreate({
//       					where:{
//       						name:'admin'
//       					}
//       				},
//       				roleObject
//       				function(err, role){
//       					console.log(role);
//       				});


//       			// Role.findOne({
//       			// 	where: {
//       			// 		name: 'admin'
//       			// 	}
//       			// }, function(err, role){
//       			// 	if (err) throw err;

//       			// 	// creating role from scratch

//       			// 	// console.log( role );
//       			// 	// console.log( !role );

//       			// // 	if( !role ){

// 					    // // Role.create({
// 					    // //   name: 'admin'
// 					    // // }, function(err, role) {
// 					    // //   if (err) throw err;

// 					    // //   console.log('Created role:', role);

// 					    // //   //add admin user an admin role
// 					    // //   role.principals.create({
// 					    // //     principalType: RoleMapping.USER,
// 					    // //     principalId: user.id 
// 					    // //   }, function(err, principal) {
// 					    // //     if (err) throw err;

// 					    // //     console.log('Created principal:', principal);
// 					    // //   });
// 					    // // });
//       			// // 	}


//       			// });

      			

// 	      }

// 	      database.disconnect();
// 	    });

// 	});


// 	});




// });


// database.automigrate('VideoModel', function(err){
	// if (err) throw err;

	// var userId = User.findOne({field:'id', where: { name:'admin' }})
	// .then(function(data){
		// console.log(data);
		// return 
	// })
	// console.log(userId);

	// videos(function(array){

	// 	array.forEach(function(element) {

	// 		Video.findOrCreate({
	// 	      where: {
	// 	        title: element.title,
		        
	// 	      }
	// 	    }, element)
	// 	    .then(function(video){
		    	
	// 	    })
	// 	    .catch(function(err){
	// 	    	throw err;
	// 	    })
	// 	});

	// });	
// });

// database.automigrate('VideoModel', function(err) {
// 	if (err) throw err;

// 	app.models.UserModel.findOne({
// 	      where: {
// 	        name: 'admin',
	        
// 	      }
// 	    }, function (err, user) {


// 			console.log( user )	    	;



// 	// app.models.VideoModel.create(adminVideos, function(err, model) {
// 	// 	if (err) throw err;

// 	// 	console.log('Created:', model);

// 	// 	database.disconnect();
// 	// });




// 	    });





// });

// // server.automigrate('RoleMapping', function(err) {
// // 	if (err) throw err;

// // 	var roleMapping = {
// // 		principalType: "USER",
// // 		principalId: "59278006448ae509a00261c4",
// // 		roleId: '59278362b64ed01098857a4f',
// // 		// id: 1
// // 	};

// // 	app.models.RoleMapping.create(roleMapping, function(err, model) {
// // 		if (err) throw err;

// // 		console.log('Created:', model);

// // 		server.disconnect();
// // 	});

// // });

 
// // server.automigrate('Role', function(err) {
// // 	if (err) throw err;

// // 	var role = {
// // 		name: "admin",
// // 		created_at:"2017-02-21T06:07:25.571Z",
// // 		updated_at:"2017-02-21T06:07:25.571Z",
// // 		// id:1
// // 	};	

// // 	app.models.Role.create(role, function(err, model) {
// // 		if (err) throw err;

// // 		console.log('Created:', model);

// // 		server.disconnect();
// // 	});

// // });

