'use strict';


var path        = require('path');

var app         = require(path.resolve(__dirname, '../server/server'));
var database    = app.datasources.videoDS;

// var async       = require('async');

var Promise     = require('bluebird');

let accounts    = require(path.resolve(__dirname, 'sample-users-data'));

let adminVideos = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;
var Role        = app.models.Role;
var RoleMapping = app.models.RoleMapping;

var Video       = app.models.VideoModel;


//creating loopback necessary tables if no exists
// var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
// database.automigrate(lbTables, function(err) {
// // database.autoupdate(lbTables, function(err) {	
//   if (err) throw err;

//   console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
//   database.disconnect();
// });







// Promise
database.automigrate('UserModel', function(err) {
	if (err) throw err;

	// Promise.promisifyAll( accounts );



	// accounts.getSampleData()
	// 	.map(function(element){
	// 		console.log(element);
	// 	})

	accounts(function(array){

		array.forEach(function(element) {

			User.findOrCreate({
		      where: {
		        name: element.name,
		        email: element.email,
		      }
		    }, element).then(function(user){
		    	console.log(user);
		    	// if(user.name == 'admin'){
		    	// 	console.log('pida');
		    	// 	var query = { name: 'admin' };
		    	// 	Role.findOrCreate({
		    	// 		where: query
		    	// 	}, query,
		    	// 	function(role){
		    	// 		console.log(role);
		    	// 	});
		    	// }
		    })
		    .catch(function(err){
		    	throw err;
		    })


		});

	});


});


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

