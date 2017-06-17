'use strict';


var path        = require('path');
var async       = require('async');

let app         = require(path.resolve(__dirname, '../server/server'));

var database    = app.datasources.videoDS;

let accounts    = require(path.resolve(__dirname, 'sample-users-data'));

let videos      = require(path.resolve(__dirname, 'sample-videos-data'));


var User        = app.models.UserModel;

var Video       = app.models.VideoModel;


module.exports = function(){

	async.parallel({
		users: async.apply(),
		videos: async.apply()
	}, function(err, results){
		if( err ) throw err;

		console.log(results);
		console.log(results.users);
		console.log(results.videos);

	});

};

function createUsers(cb){
	database.autoupdate('UserModel', function(err){
		if (err) return cb(err);


	});
};

function createVideos(cb){
	database.autoupdate('VideoModel', function(err){
		if (err) return cb(err);

		
	});
};
