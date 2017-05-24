'use strict';

var chai     = require('chai');
var chaiHttp = require('chai-http');
var server   = require('../server/server');
var should   = chai.should();

chai.use(chaiHttp);

describe('Vids', function(){

	it('should show all vids on GET /api/video', function(done){

		chai.request(server)
			.get('/api/video')
			.end(function(err, res){
				res.should.have.status(200);
				res.body.should.have.least(4);
				done();

			});			

	});

	it('should show only the title of vids on GET /api/video/?filter[fields][title]=true', function(done){

		chai.request(server)
			.get('/api/video/?filter[fields][title]=true')
			.end(function(err, res){

				res.should.have.status(200);
				res.body[0].should.have.property('title');
				res.body[0].should.not.have.property('name');
				done();

			});

	});

	

});