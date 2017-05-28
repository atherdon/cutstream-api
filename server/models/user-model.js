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
};
