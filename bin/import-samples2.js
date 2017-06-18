'use strict';


var path        = require('path');
var async       = require('async');

let server      = require(path.resolve(__dirname, '../server/server'));

var database    = server.datasources.videoDS;


let getUsers       = require(path.resolve(__dirname, 'sample-users-data'));

let getVideos      = require(path.resolve(__dirname, 'sample-videos-data'));

let getExampleCases = require(path.resolve(__dirname, 'sample-examples-cases-data'));

let getExampleVideos = require(path.resolve(__dirname, 'sample-examples-video-data'));

var User        = server.models.UserModel;

var Video       = server.models.VideoModel;


// module.exports = function(){

	async.parallel({
		users: async.apply(createUsers),
		videos: async.apply(createVideos),
		// cases: async.apply(createCases),
		// exaples: async.apply(createExamples),
	}, function(err, results){
		if( err ) throw err;

		// console.log(results);
		// console.log(results.users);
		// console.log(results.videos);
		// console.log(results.cases);
		// console.log(results.examples);

		attachVideosToUsers(results.users, results.videos, function(err){
			console.log('>models create sucessfully');
		});

	});

// };

function createUsers(cb){
	// console.log(users);
	database.automigrate('UserModel', function(err){
		if (err) return cb(err);

		User.create(getUsers(), cb);
	});
};

function createVideos(cb){
	database.automigrate('VideoModel', function(err){
		if (err) return cb(err);

		Video.create(getVideos(), cb);
	});
};

function createCases(cb){
	database.automigrate('CaseModel', function(err){
		if (err) return cb(err);

		Video.create(getVideos(), cb);
	});
};

function createExamples(cb){
	database.automigrate('ExampleModel', function(err){
		if (err) return cb(err);

		Video.create(getVideos(), cb);
	});
};

//attaching videos to admin user
function attachVideosToUsers(users, videos, cb){

	videos.forEach(function(video){
		video.updateAttribute('userId', users[2].id);
		console.log(video.userId);
	});

	// Video.updateAttribute('userId', users[0].id);
}
