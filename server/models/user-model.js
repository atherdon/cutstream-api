'use strict';

var path = require('path');

module.exports = function(UserModel) {

	UserModel.validatesPresenceOf('username');
  UserModel.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
    
  // var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

  // UserModel.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
  // if (!(UserModel.settings.realmRequired || UserModel.settings.realmDelimiter)) {
  //   UserModel.validatesUniquenessOf('email', {message: 'Email already exists'});
  //   UserModel.validatesUniquenessOf('username', {message: 'User already exists'});
  // }


	UserModel.observe("before save", function updateTimestamp(ctx, next) {
 
    	if( ctx.isNewInstance ){
    		ctx.instance.created_at = new Date();
    		ctx.instance.updated_at = new Date();
    	} 
    	
    	next();
  });

  UserModel.observe('update', function(ctx, next){
  	ctx.instance.updated_at = new Date();
  	next();
  });


  UserModel.log = function(userId, options) {
    
    // IMPORTANT: forward the options arg
    return UserModel.findById(userId, null, options)
              .then(function(data){
                const token = options && options.accessToken;
                const userId = token && token.userId;
                const user = userId ? 'user#' + userId : '<anonymous>';     

                console.log('(%s) %s', user, msg.text);
                // console.log(options);
                // console.log(options.accessToken);
              });

  };

  // @TODO move to config file later
  UserModel.remoteMethod('log', {
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

  UserModel.adminQuery = function(){
    return { where :{
      username: 'admin'
      } 
    }
  };


  UserModel.addVideos = function () {
     //  var VideoModel = UserModel.app.models.VideoModel;

     //  UserModel.find({
     //    fields:'id'
     //  })
     // .then(function(usersIds){

      //   console.log(usersIds);

      // });  

        // var result = Object.keys(usersIds).map(function(e) {
        //   return usersIds[e].id;
        // });

        // console.log(result);
        // console.log('-------');

        // VideoModel.upsertWithWhere({ username:'admin' }, { userId:result })
        // .then(function(videos){
        //   console.log(videos);
        // })

      //   VideoModel.find({})
      //       .then(function(videos){
      //           // console.log(videos);
      //           console.log('-------');

      //           videos.forEach(function(video){

      //               video.upsert({userId:result}).then(function(video){
      //                 console.log(video);
      //               });
      //               // video.updateAttribute('userId', result);
      //           });    
      //           // console.log(videos);
      //           console.log('-------');
      //       })

      // }).catch(function(err){
      //       throw err;
      // });      

     //  UserModel.findOne({
     //    fields:'id', where: { name:'admin' }
     //  })
     // .then(function(result){

     //    videos.forEach(function(video){
     //      video.updateAttribute('userId', result.id);
     //    })

     //  });

  };

  // assign admin role to admin user
  UserModel.assign = function(){

    var Role        = UserModel.app.models.Role;
    var RoleMapping = UserModel.app.models.RoleMapping;

    UserModel.findOne({
      fields:'id', 
      where: { 
        username:'admin' 
      }
    })
      .then(function(result){

        Role.create({ name:'admin' })
          .then(function(role){

            role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: result.id
              }, function(err, principal){
                console.log('Principal', principal);
              });
          })
          .catch(function(err){
            throw err;
          });
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
