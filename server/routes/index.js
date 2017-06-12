var express  = require('express');
// var router   = express.Router();


const util   = require('util');

// var http = require('http');

//models
// var Video    = require('../models/video');

var mainController = require('../controllers/main-controller');





/* routers */
app.router('/')
   .get(mainController.getHomepage);

app.router('/insert')
   .post(mainController.postVideo);

app.router('/example')
   .get(mainController.getExample);

app.router('/mongotest')
   .get(mainController.databaseConnect);

        

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.post('/insert', function(req, res){

// 	// console.log(util.inspect( req.body, false, null ));

// 	//@todo remove startB & endB from form elements

// 	var url   = req.body.url;
	
// 	var start = req.body.start;
// 	var end   = req.body.end;
// 	var title = req.body.title;
// 	var desc  = req.body.desc;
// 	var step  = req.body.step; 
	

//     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//     var match  = url.match(regExp);
//     var slug   = (match&&match[7].length==11)? match[7] : false;

// 	var value = new Video({
// 	     title : title,
// 	     url   : url,
// 	     desc  : desc,
// 	     start : start,
// 	     end   : end,
// 	     step  : step,
// 	     slug  : slug,
// 	});

// 	// console.log( value );

// 	value.save().then(function(docs){

// 		// console.log( docs );
// 		// console.log( docs._id );

// 		docs.linka = '/edit/' + docs._id + ''; //@todo change this later and move to layout template
// 		// docs.linka = '/edit/?gid=' + docs._id + '';

// 		// res.render('player', docs);


// 		res.render('player3', docs);

// 	});


// });


// this controller relates to show cases pages.
// @todo readme later to more simple and appropriate
// router.get('/example', function(req, res){

// 	var object = {
// 		title    : false,
// 		subtitle : false,
// 		link     : false,
// 		body     : false,
// 	}

// 	res.render('example1', object);
// })


// router.get('/mongotest', function(req, res, next) {
  
// 	var firstRow  = new Video({
// 		 _id:  "thetest",
// 	     title : "Title1",
// 	     url   : "http://www.google.com",
// 	     desc  : "desc",
// 	     start : 60,
// 	     end   : 180,
// 	     step  : 1,
// 	     slug  : "google"
// 	  });

// 	  // var secondRow = new Video({
// 	  //    title : "Title2",
// 	  //    url   : "www.gmail.com",
// 	  //    desc  : "description very long variable",
// 	  //    start : 10,
// 	  //    end   : 280,
// 	  //    step  : 60,
// 	  //    slug  : "gmail",
// 	  // });

// 	  // var thirdRow  = new Video({
// 	  //    title : "Title3",
// 	  //    url   : "www.drive.com",
// 	  //    desc  : "description",
// 	  //    start : 60,
// 	  //    end   : 370,
// 	  //    step  : 300,
// 	  //    slug  : "gdrive",
// 	  // });

// 	firstRow.save().then(function(docs){

// 		console.log(docs);
// 		console.log('Video created!');

// 	});


// 	// secondRow.save();
// 	// thirdRow.save();


// 	// //get all the Videos

// 	// Video.find({}, function(err, videos) {

// 	//   if (err) {
// 	//   	throw err;
	  	
// 	//   }

// 	//   // object of all the videos
// 	//   console.log( videos );
// 	// });



// 	res.render('index', { title: 'CutStream | Start & End point for your video' });

// });

// module.exports = router;


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}