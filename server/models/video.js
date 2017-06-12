'use strict';



module.exports = function(VideoModel) {

	// this fields must be exists
	VideoModel.validatesPresenceOf(
		'title', 'url', 
		'start', 
		'end', 
		'step',
		'userId'
	);

	// this fields must be numeric
	VideoModel.validatesNumericalityOf('start', {int: true});
	VideoModel.validatesNumericalityOf('end',   {int: true});
	VideoModel.validatesNumericalityOf('step',  {int: true});


 	start : Number, //@todo 
    end   : Number, //@todo if empty - set duration end
    step  : Number, //@todo if empty - set 1

	// YouTube url custom validation

	var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	VideoModel.validatesFormatOf('url', {
		with: re, message: 'url should be a valid YouTube link'
	});


	// Start Number must be greater than Start Number
	// @TODO test this
	VideoModel.validate('start', startTimeValidator, {
		message: ''
	});

    function startTimeValidator(err) {

      if( !this.start ){ //if empty - set 0
      	this.start = 0;
      }		
      
    }

    VideoModel.validate('step', startTimeValidator, {
		message: ''
	});

    function startTimeValidator(err) {

      if( !this.step ){ //if empty - set 0
      	this.step = 1;
      }		
      
    }


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
		returns: {
			arg: 'videos',
			type: 'array'
		},
		http: {
			path: '/list-videos',
			verb: 'get'
		}
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
