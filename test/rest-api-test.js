/* jshint camelcase: false */
// var app = require('../server/server');
// var request = require('supertest');

// var loopback = require('loopback');

// function json(verb, url) {
//     return request(app)[verb](url)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/);
//   }


var chai     = require('chai');
var chaiHttp = require('chai-http');
var server   = require('../server/server');
var assert = require('assert');
var should   = chai.should();

chai.use(chaiHttp);

var assert = require('chai').assert;
// var should = require('chai').should;

describe('REST API request', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    server.removeAllListeners('started');
    server.removeAllListeners('loaded');
    done();
  });
chai.request(server)
      .get('/api/video')
      .end( function(err, res){
        res.should.have.status(200);
        res.body.should.have.least(4);
        done();
      });     

  it('should not allow access without access token', function(done){
    chai.request(server)
      .get('/api/video')
      .end( function(err, res){

        res.should.have.status(401);
        // res.body.should.have.least(4);
        done();
      }); 
    // json('get', '/api/projects')
    //   .expect(401, done);
  });

  it('should login non-admin and get the balance', function(done) {

    chai.request(server)
      .post('/api/user/login')
      .field('name', 'admin')
      .field('email', 'admin')
      .end( function(err, res){

        res.should.have.status(200);
        res.body.should.have.least(4);
        assert.typeOf(res.body,'object');
        res.body.id.should.exist();
        var accessToken = res.body.id;

          chai.request(server)
              .get('/api/videos/' + 1 + '?access_token=' + accessToken)
              .end( function(err, res){
                res.error.should.not.exist();
                res.should.have.status(200);  
                assert.typeOf(res.body,'object');
                // @TODO add some check of existence of values/properties from some of videos

                done();   
              });

        done();
      }); 

    
  });

  var accessToken;
  it('should login the admin user and get all videos', function(done) {

    // json('post', '/api/users/login')
    //   .send({
    //     username: 'Bob',
    //     password: 'opensesame'
    //   })
    //   .expect(200, function(err, res) {
    //     assert(typeof res.body === 'object');
    //     assert(res.body.id, 'must have an access token');
    //     assert.equal(res.body.userId, 3);
    //     accessToken = res.body.id;
    //     json('get', '/api/projects?access_token=' + accessToken)
    //       .expect(200, function(err, res){
    //         var projects = res.body;
    //         assert(Array.isArray(res.body));
    //         assert.equal(res.body.length, 2);
    //         done();
    //       });
    //   });

  });

  // wouldn't work
  it('should donate money to project1', function(done) {

        // json('post', '/api/projects/donate?access_token=' + accessToken)
        //   .send({
        //     id: 2,
        //     amount: 10
        //   })
        //   .expect(200, function(err, res){
        //     assert(typeof res.body === 'object');
        //     assert(res.body.success);
        //     assert.equal(res.body.success, true);
        //     done();
        //   });
  });
});

describe('Unexpected Usage', function(){
  it('should not crash the server when posting a bad id', function(done){

    // json('post', '/api/users/foobar')
    //   .send({})
    //   .expect(404, done);

  });
});