'use strict';

var path = require('path');

module.exports = function(Usermodel) {

	Usermodel.validatesPresenceOf('name');
  Usermodel.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
    

	Usermodel.observe("before save", function updateTimestamp(ctx, next) {
 
    	if( ctx.isNewInstance ){
    		ctx.instance.created_at = new Date();
    		ctx.instance.updated_at = new Date();
    	} 
    	
    	next();
  });

  Usermodel.observe('update', function(ctx, next){
  	ctx.instance.updated_at = new Date();
  	next();
  });


  Usermodel.log = function(userId, options) {
    
    // IMPORTANT: forward the options arg
    return Usermodel.findById(userId, null, options)
              .then(function(data){
                const token = options && options.accessToken;
                const userId = token && token.userId;
                const user = userId ? 'user#' + userId : '<anonymous>';     

                console.log('(%s) %s', user, msg.text);
                // console.log(options);
                // console.log(options.accessToken);
              });

  };

  Usermodel.remoteMethod('log', {
    accepts: [{
      arg: 'userId',
      type: 'string',
      required: true
    },
    {
      arg: 'options',
      type: 'object',
      http: 'optionsFromRequest'
    }],
    http: {
      path: '/log/:userId',
      verb: 'post'
    }
  });

  UserModel.addVideos = function (videos) {
      UserModel.findOne({
        fields:'id', where: { name:'admin' }
      })
     .then(function(result){

        videos.forEach(function(video){
          video.updateAttribute('userId', result.id);
        })

      });

  };

  // MyModel.register = function(req, param, cb) {
  //   var userId = req.accessToken.userId;

  //   console.log(userId); 
  //   cb(null, ...);
  // };

  // MyModel.remoteMethod(
  //   'register',
  //   {
  //     accepts: [
  //       { arg: 'req', type: 'object', http: {source: 'req'} }, // <----
  //       { arg: 'param', type: 'string', required: true },
  //     ]
  //   });

     
};
