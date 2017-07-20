'use strict';



module.exports = function(VideoModel) {

	// this fields must be exists
	VideoModel.validatesPresenceOf(
		'title', 'url' 
		// 'start', 
		// 'end', 
		// 'step',
		// 'userId'
	);


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

    // this fields must be numeric
	VideoModel.validatesNumericalityOf('start', {int: true});
	VideoModel.validatesNumericalityOf('end',   {int: true});
	VideoModel.validatesNumericalityOf('step',  {int: true});


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
    
	VideoModel.listAdminVideos = function(){

		var UserModel = VideoModel.app.models.UserModel;

		// console.log('123');
		// console.log(UserModel);
		// UserModel.findOne({
		//  where : {
	 //      username: 'admin'
  //     	} 
  //   	})
		// .then(function(admin){
		// 	console.log(admin.id)});


		// UserModel.videos.findById();

		// UserModel.videos({
		//  where : {
	 //      username: 'admin'
  //     		} 
  //   	}, function(err, videos){
		// 		console.log(videos)
		// 	});

		UserModel.findOne({
		 where : {
	      username: 'admin'
      		} 
    	})
		.then(function(admin){
			// console.log(admin.id);

			// admin.videos({},function(err, videos){
			// 	console.log(videos)
			// })

			VideoModel.find({
				where: {
					// userId: admin.id 
					userId:  admin.id 
				},
				fields: [
					'title', 'url', 'desc',
					'start', 'end', 'step'
				]				
				
			}, function(err, videos){
				console.log(videos)
			});
		});



	};
	
	VideoModel.listExamplesShort = function(){
		var ExampleModel = VideoModel.app.models.ExampleModel;
		// var data = {}
		ExampleModel.find({
			fields: [
					'id', 'img', 'title',					
				]
		})
		.then(function(example){
			return example;
		})
		.catch(function(err){
			throw err;
		});


	};

	VideoModel.listExamples = function(cb){
		var ExampleModel = VideoModel.app.models.ExampleModel;

		ExampleModel.find({
			// fields: [
			// 		'id', 'img', 'title',
					
			// 	]
		})
		.then(cb)
		.catch(function(err){
			throw err;
		});


	};

	VideoModel.listExamples = function(exampleId, cb){
		var ExampleModel = VideoModel.app.models.ExampleModel;

		ExampleModel.findById(exampleId, { 

			// fields: [
			// 		'id', 'img', 'title',
					
			// 	]
		})
		.then(cb)
		.catch(function(err){
			throw err;
		})


	};

	VideoModel.listHomeExamples = function (cb) {
		var ExampleModel = VideoModel.app.models.ExampleModel;
		
		
		var object = {};

		VideoModel.find({
			where: {title:{ inq: [
				'Logan Epic Kill',
				'Benedict Cumberbatch Shows Off Doctor Strange\'s Hands',
				'Black Panther Featurette',
				'Jessica Jones Mirror Cracking'
				] 
			}}
		}).then(function(result){

			// console.log(result);
			object.examples = [];
			result.forEach(function(item){
				
				var to_add = {
					id: item.id,
					title: item.title
				};

				if( item.title == 'Logan Epic Kill' ){
					to_add.img = '/images/logan3.jpg';
				}

				if( item.title == 'Benedict Cumberbatch Shows Off Doctor Strange\'s Hands' ){
					to_add.img = '/images/doctor-strange2.jpg';
				}				

				if( item.title == 'Black Panther Featurette' ){
					to_add.img = '/images/bp4.jpg';
				}

				if( item.title == 'Jessica Jones Mirror Cracking' ){
					to_add.img = '/images/jessjo.jpg';
				}

				object.examples.push(to_add);

			});
			// console.log(object.homepage);

			// object.homepage = result;


			ExampleModel.find({
				fields: [
						'id', 'img', 'title',					
					]
			})
			.then(function(example){
				
				object.cases = example;
				cb(object);
			})
			.catch(function(err){
				throw err;
			});


		});


	};

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
