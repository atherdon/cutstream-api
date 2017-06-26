'use strict';


var path        = require('path');
var async       = require('async');

let server      = require(path.resolve(__dirname, '../server/server'));

var database    = server.datasources.videoDS;



let getUsers         = require(path.resolve(__dirname, 'sample-users-data'));

let getVideos        = require(path.resolve(__dirname, 'sample-videos-data'));

let getExamples  = require(path.resolve(__dirname, 'sample-examples-data'));

let getExampleVideos = require(path.resolve(__dirname, 'sample-examples-video-data'));


var List1       = require(path.resolve(__dirname, 'sample-examples-list'));

var User        = server.models.UserModel;
var Role        = server.models.Role;
var RoleMapping = server.models.RoleMapping;


var Video       = server.models.VideoModel;

var Examples    = server.models.ExampleModel;
// module.exports = function(){

	async.parallel({
		users    : async.apply(createUsers),
		videos   : async.apply(createVideos),
		examples : async.apply(createExamples),

		examples1: async.apply(createExampleVideos1),
		examples2: async.apply(createExampleVideos2),
		examples3: async.apply(createExampleVideos3),
		// examples4: async.apply(createExampleVideos4),

		// cases    : async.apply(createCases)

	}, function(err, results){
		if( err ) throw err;

		// console.log(results);
		// console.log(results.users);
		// console.log(results.videos);
		// console.log(results.cases);
		console.log(results.examples1[0]);
		console.log(results.examples2[0]);
		console.log(results.examples3[0]);
		// console.log(results.examples);
		

		assignAdmin(results.users[2], function(err){
			console.log('>admin role create sucessfully');
		});

		// attachVideosToUsers(results.users, results.videos, function(err){
		// 	console.log('>models create sucessfully');
		// });


		attachExampleVideosToAdmin(results.users[2], results.examples1, function(err){
			console.log('>examples1 attached to admin');
		});

		attachExampleVideosToAdmin(results.users[2], results.examples2, function(err){
			console.log('>examples2 attached to admin');
		});

		attachExampleVideosToAdmin(results.users[2], results.examples3, function(err){
			console.log('>examples3 attached to admin');
		});

		// attachExampleVideosToAdmin(results.users, results.examples4, function(err){
		// 	console.log('>examples4 attached to admin');
		// });
		// casesList1(results.examples1);casesList2(results.examples2);casesLis31(esults.examples3);
		// var a = List1();
		// a.getList(results.examples1);




console.log(List1.get(results.examples1));
// let List2       = require(path.resolve(__dirname, 'sample-examples-list2'));
// let List3       = require(path.resolve(__dirname, 'sample-examples-list3'));

		// importCase1(results.examples1, results.examples[0]);
		// importCase2(results.examples2, results.examples[1]);
		// importCase3(results.examples3, results.examples[2]);
		// console.log('> examples imported and attached to admin');

	});

// };

function createUsers(cb){
	// console.log(users);
	database.automigrate('UserModel', function(err){
		if (err) return cb(err);

		User.create(getUsers(), cb);
	});
};

function assignAdmin(admin, cb){
	
	database.automigrate('Role', function(err){
		if (err) return cb(err);

		Role.create({ name:'admin' })
		.then(function(role){

			role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: admin.id
              }, function(err, principal){
                console.log('Principal', principal);
              });

		})
		.catch(function(err){
            throw err;
        });
	});	
};

function createVideos(cb){
	database.automigrate('VideoModel', function(err){
		if (err) return cb(err);

		Video.create(getVideos(), cb);
	});
};

function createExamples(cb){
	database.automigrate('ExampleModel', function(err){
		if (err) return cb(err);

		var examples = getExamples();
		Examples.create(examples, cb);
	});
};

// function createCases(cb){
// 	database.automigrate('ExampleModel', function(err){
// 		if (err) return cb(err);

// 		var examples = getExampleVideos();
// 		Examples.create(examples, cb);
// 	});
// };

function attachExampleVideosToAdmin(admin, videos, cb){

	videos.forEach(function(video){
		video.updateAttribute('userId', admin.id);
		
	});

};


function createExampleVideos1(cb){
	database.autoupdate('VideoModel', function(err){
		if (err) return cb(err);

		var examples = getExampleVideos();
		
		Video.create(examples[0], cb);
		
	});
};

function createExampleVideos2(cb){
	database.autoupdate('VideoModel', function(err){
		if (err) return cb(err);

		var examples = getExampleVideos();
		
		Video.create(examples[1], cb);
		
	});
};

function createExampleVideos3(cb){
	database.autoupdate('VideoModel', function(err){
		if (err) return cb(err);

		var examples = getExampleVideos();
		
		Video.create(examples[2], cb);
		
	});
};



function importCase1(data, modelExamples){
	var case1 = casesList1(data);
	modelExamples.updateAttribute('videos', case1);
};

function importCase2(data, modelExamples){
	var case2 = casesList2(data);
	modelExamples.updateAttribute('videos', case2);
};

function importCase3(data, modelExamples){
	var case3 = casesList3(data);
	modelExamples.updateAttribute('videos', case3);
};




//attaching videos to admin user
// function attachVideosToUsers(users, videos, cb){

// 	videos.forEach(function(video){
// 		video.updateAttribute('userId', users[2].id);
// 		console.log(video.userId);
// 	});

// 	// Video.updateAttribute('userId', users[0].id);
// };

//attaching videos to admin user
// function attachExampleVideosToAdmin(users, exampleVideos, cb){

// 	exampleVideos.forEach(function(video){
// 		video.updateAttribute('userId', users[2].id);
// 		// console.log(video.userId);
// 	});

// };

// function attachCasesToAdmin(){

// };

// function attachListsToCases(){

// };

