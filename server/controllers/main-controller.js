'use strict';


var path      = require('path');
var validator = require('express-validator');

let server    = require(path.resolve(__dirname, '../server'));
var Video     = server.models.VideoModel;
var Example   = server.models.ExampleModel;


exports.getHomepage = async function(req, res, next){

	// @TODO change this bad hardcode. But I don't want to do it right now.
	// It will be cool, if any of this homepage samples have similar to examples data. because we need to store images, etc.
	
	Video.listHomeExamples(function(result){

		// console.log(result.cases);
		// console.log(result.examples);

		res.render('index', { 
			title: 'CutStream | Start & End point for your video',
			cases: result.cases,
			examples: result.examples // @TODO change this
		});

	});
	// .catch(function(err){
	// 	throw err;
	// });



	

};

exports.postVideo = function(req, res, next){

	// console.log(util.inspect( req.body, false, null ));

	var url   = req.body.url;
	
	var start = req.body.start;
	var end   = req.body.end;
	var title = req.body.title;
	var desc  = req.body.desc;
	var step  = req.body.step; 
	

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match  = url.match(regExp);
    var slug   = (match&&match[7].length==11)? match[7] : false;

    var data = {
	     title : title,
	     url   : url,
	     desc  : desc,
	     start : start,
	     end   : end,
	     step  : step,
	     slug  : slug,
	};

    Video.create(data, function(err, obj){

    	// console.log(obj);
    	// console.log(obj.id);
    	var edit_link = '/edit/' + obj._id;
    	res.render('player3', obj);

    });



};
//CutStream | Start & End point for your video

exports.getExample = function(req, res, next){
	
	var exampleId = req.params.id;

	// console.log(exampleId);

	Example.findById(exampleId, {
      // fields:'id', 
      // where: { 
      //   username:'admin' 
      // }
    })
    .then(function(example){

    	// console.log(example);
    	// console.log(example.title);
    	// console.log(example.videos);
    	// console.log(example.description);
    	// img
    	// url
    	// description[0]
    	// description[1]
    	// description[2]
    	if(example){
    		
			var object = {
				img      : example.img,
				url      : example.url,
				title    : example.title,
				videos   : example.videos,
				description: example.description,
				id: exampleId
			
			}
			res.render('example-auto', object);	

		}

		
		

    }).catch(function(err){

    	res.render('empty', { title: 'Error' });
    	throw err;
    });



};

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}
