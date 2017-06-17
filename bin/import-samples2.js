'use strict';


var path        = require('path');
var async       = require('async');

let app         = require(path.resolve(__dirname, '../server/server'));

var database    = app.datasources.videoDS;

let users    = require(path.resolve(__dirname, 'sample-users-data'));

let videos      = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;

var Video       = app.models.VideoModel;


module.exports = function(){

	async.parallel({
		users: async.apply(createUsers),
		videos: async.apply(createVideos)
	}, function(err, results){
		if( err ) throw err;

		console.log(results);
		console.log(results.users);
		console.log(results.videos);

		// attachVideosToUsers(results.users, results.videos, function(err){
		// 	console.log('>models create sucessfully');
		// });

	});

};

function createUsers(cb){
	database.autoupdate('UserModel', function(err){
		if (err) return cb(err);

		User.create(users, cb);
	});
};

function createVideos(cb){
	database.autoupdate('VideoModel', function(err){
		if (err) return cb(err);

		Video.create(videos, cb);
	});
};

//attaching videos to admin user
function attachVideosToUsers(users, videos, cb){

	videos.forEach(function(video){
		video.updateAttribute('userId', users[0].id);
		console.log(video.userId);
	});

	// Video.updateAttribute('userId', users[0].id);
}
