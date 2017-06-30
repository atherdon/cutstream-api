'use strict';


var path      = require('path');
var validator = require('express-validator');

let server    = require(path.resolve(__dirname, '../server'));
var Video     = server.models.VideoModel;


// function pidor(cb){

// 	VideoModel.find({
// 			where: {title:{ inq: [
// 				'Logan Epic Kill',
// 				'Benedict Cumberbatch Shows Off Doctor Strange\'s Hands',
// 				'Black Panther Featurette',
// 				'Jessica Jones Mirror Cracking'
// 				] 
// 			}}
// 		}).then(cb);

// };

exports.getHomepage = async function(req, res, next){

	

	// @TODO change this bad hardcode. But I don't want to do it right now.
	// It will be cool, if any of this homepage samples have similar to examples data. because we need to store images, etc.
	
	Video.listHomeExamples(function(result){
		// console.log(result);

		res.render('index', { 
			title: 'Express',
			cases: result.cases,
			examples: result.homepage // @TODO change this
		});

	});

	// console.log(Video.listExamplesShort());
	// Video.find({
	// 	where: {title:{ inq: [
	// 		'Logan Epic Kill',
	// 		'Benedict Cumberbatch Shows Off Doctor Strange\'s Hands',
	// 		'Black Panther Featurette',
	// 		'Jessica Jones Mirror Cracking'
	// 		] 
	// 	}}
	// }).then(function(array){
	// 	console.log(array);
	// });

	// const homepageExamples = await pidor();

	// console.log(homepageExamples);



		// function(examples){
		// console.log(examples);
		

		// object.examples = examples;
// 
	// });

	// console.log(object);

	// function(videos){
	// 	console.log(videos);
	// });
	// let errors = req.validationErrors();
	// if (errors) {
 //    	req.flash('errors', errors);
	// }

	

};

exports.postVideo = function(req, res, next){

	// console.log(util.inspect( req.body, false, null ));

	//@todo remove startB & endB from form elements

	var url   = req.body.url;
	
	var start = req.body.start;
	var end   = req.body.end;
	var title = req.body.title;
	var desc  = req.body.desc;
	var step  = req.body.step; 
	

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match  = url.match(regExp);
    var slug   = (match&&match[7].length==11)? match[7] : false;

	var value = new Video({
	     title : title,
	     url   : url,
	     desc  : desc,
	     start : start,
	     end   : end,
	     step  : step,
	     slug  : slug,
	});

	// console.log( value );	
	//@TODO change to bluebird version with async
	// http://stackoverflow.com/questions/25555139/bluebird-promisies-crud-example-using-nodejs-express-and-mongoose
	value.save().then(function(docs){

		// console.log( docs );
		// console.log( docs._id );

		docs.linka = '/edit/' + docs._id + ''; //@todo change this later and move to layout template
		// docs.linka = '/edit/?gid=' + docs._id + '';

		// res.render('player', docs);


		res.render('player3', docs);

	});



};


exports.getExample = function(req, res, next){
	var exampleId = req.params.id;
	ExampleModel.findById(exampleId, {
      // fields:'id', 
      // where: { 
      //   username:'admin' 
      // }
    })
    .then(function(example){

    	console.log(example);
    	console.log(example.title);
    	console.log(example.videos);
    	// img
    	// url
    	// description[0]
    	// description[1]
    	// description[2]

		var object = {
			title    : false,
			subtitle : false,
			link     : false,
			body     : false,
			description0: (description[0]) ? description[0] : '',
		}
		res.render('example-auto', object);
		

    });




	

};

//@TODO change to bluebird version with async
// firstRow.save().then(function(docs){

// 	console.log(docs);
// 	console.log('Video created!');

// });



// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
