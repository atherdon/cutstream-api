'use strict';

var chai     = require('chai');
var chaiHttp = require('chai-http');
var server   = require('../server/server');
var should   = chai.should();

chai.use(chaiHttp);

describe('Vids', function(){

	var message = 'should show all vids on GET /api/video';
	it(message, function(done){
		chai.request(server)
			.get('/api/video')
			.end( function(err, res){
				res.should.have.status(200);
				res.body.should.have.least(4);
				done();
			});			
	});

	var message2 = 'should show only the title of vids on GET /api/video/?filter[fields][title]=true';
	it(message2, function(done){

		chai.request(server)
			.get('/api/video/?filter[fields][title]=true')
			.end( function(err, res){
				res.should.have.status(200);
				res.body[0].should.have.property('title');
				res.body[0].should.not.have.property('name');
				done();
			});
	});

	// @TODO add 
// 	var mongoose = require("mongoose");
// var customer = require("../lib/customers");
// mongoose.connect('mongodb://localhost/tekpub_test');  
// describe("Customers", function(){  
//   //holds a customer to use in the each test  
//   var currentCustomer = null;  
//   beforeEach(function(done){    
//     //add some test data    
//     customer.register("test@test.com", "password", "password", function(doc){      
//       currentCustomer = doc;      
//       done();    
//     });  
//   });    
//   afterEach(function(done){    
//     //delete all the customer records    
//     customer.model.remove({}, function() {      
//       done();    
//     });  
//   });  
//   //tests...  
// });


	//  @TODO add youtube video link validation test

});
