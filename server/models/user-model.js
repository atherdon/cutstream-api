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


  // on login set access_token cookie with same ttl as loopback's accessToken
  Usermodel.afterRemote('login', function setLoginCookie(ctx, accessToken, next) {  

      var res = ctx.res;
      var req = ctx.req;
      
      if (accessToken != null) {
          if (accessToken.id != null) {
              res.cookie('access_token', accessToken.id, {
                  signed: req.signedCookies ? true : false,
                  maxAge: 1000 * accessToken.ttl
              });
              return res.redirect('/');
          }
      }
      return next();
  });


     
};
