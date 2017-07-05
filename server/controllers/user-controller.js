'use strict';


var path     = require('path');

let server  = require(path.resolve(__dirname, '../server'));

// var Video   = server.models.VideoModel;
var User    = server.models.UserModel;
// var Email   = server.models.EmailModel;


exports.getVideo = function(req, res, next){
	// var videoId = req.params.id;	
	// // console.log(videoId);
 //  	// console.log(req.accessToken);
 //   //  console.log(req.accessToken.userId);
	
	// Video.findById(videoId)
	// 	.then(function(video){
	// 		// console.log(video);
	// 		if(video){
	// 			res.render('player-only', video );	
	// 		}
			

	// 	}).catch(function(err){
	// 		// if (err) {
	// 			res.render('empty', { title: 'Error' });
	// 			throw err;
	// 		// }
			
	// 	});  
};

exports.verified = function(req, res, next){

	res.render('account/verified');

};
exports.getLogin = function(req, res, next){

	var credentials = [
		email: 'admin@ibm.com',
		password: 'admin'
	];

	res.render('account/login', {
		email: credentials.email,
		password: credentials.password
	});

};

exports.postLogin = function(req, res, next){
	User.login({
		email: req.body.email,
		password: req.body.password
	}, 'UserModel', function(err, token){
		if (err) {

	        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){

	          res.render('account/reponseToTriggerEmail', {
	            title: 'Login failed',
	            content: err,
	            redirectToEmail: '/api/users/'+ err.details.userId + '/verify',
	            redirectTo: '/',
	            redirectToLinkText: 'Click here',
	            userId: err.details.userId
	          });

	        } else {

	          res.render('account/response', {
	            title: 'Login failed. Wrong username or password',
	            content: err,
	            redirectTo: '/',
	            redirectToLinkText: 'Please login again',
	          });
	        }
	        return;
		}

		 res.render('home', {
	        email: req.body.email,
	        accessToken: token.id,
	        redirectUrl: '/api/users/change-password?access_token=' + token.id
	      });
	});
};