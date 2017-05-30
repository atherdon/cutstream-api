'use strict';

// var path      = require('path');
// var app       = require(path.resolve(__dirname, '../server/server'));
// var UserModel = app.models.UserModel;
// console.log( UserModel );
// console.log( path.resolve(__dirname, '../../server/server') );
// console.log( app.models.VideoModel );

module.exports = function(VideoModel) {

	VideoModel.validatesPresenceOf(
		'title', 'url', 'start', 'end', 'step'
	);

	// YouTube url custom validation
	var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	VideoModel.validatesFormatOf('url', {with: re, message: 'url should be a valid YouTube link'});

	// End Number must be greater than Start Number
	VideoModel.validate('end', numberValidator, {
		message: 'end number should be greater then start number'
	});

    function numberValidator(err) {

      if(this.end <= this.start) {
        err();
      }
    }

	VideoModel.observe("before save", function updateTimestamp(ctx, next) {

		if( ctx.isNewInstance ){
			ctx.instance.created_at = new Date();
			ctx.instance.updated_at = new Date();
		} 
		
		next();
	});

	VideoModel.observe('update', function(ctx, next){
		ctx.instance.updated_at = new Date();
		next();
	});
    
	VideoModel.listVideos = function(cb){
		VideoModel.find({}, cb);
	};

	VideoModel.remoteMethod('listVideos',{
		returns: {arg: 'videos', type: 'array'},
		http: {path: '/list-videos', verb: 'get'}
	});

	VideoModel.listVideosByUser = function(userId, cb){
		var UserModel = VideoModel.app.models.UserModel;

		UserModel.exists(userId, function(err, user){
			if(err){ cb(err); }

			VideoModel.find({
				where: {
					userId: userId
				},
				fields: [
					'title', 'url', 'desc',
					'start', 'end', 'step'
				]				
				
			}, cb);
		});

	};

	VideoModel.remoteMethod('listVideosByUser', {
		accepts: {
			arg: 'id',
			type: 'string'
		},
		returns: {
			arg: 'videos',
			type: 'array'
		},
		http: {
			path: '/view-videos',
			verb: 'get'
		}
	});

};
