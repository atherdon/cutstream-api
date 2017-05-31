'use strict';

var request = require('request');

// var loopback = require('loopback');
// var cors = require('cors');

// app.use(cors());

module.exports = function(app) {

  var router = app.loopback.Router();
  var request = require('request');
  
  
  router.get('/index', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });


  router.get('/profile', function(req, res) {

    // var AccessToken = app.models.AccessToken;
    // AccessToken.findForRequest(req, {}, function (aux, accesstoken) {

    //   console.log(aux, accesstoken);
    //   if (accesstoken == undefined) {
    //       res.status(401);
    //       res.send({
    //           'Error': 'Unauthorized',
    //           'Message': 'You need to be authenticated to access this endpoint'
    //       });
    //   } else {
    //       var UserModel = app.models.user;
    //       UserModel.findById(accesstoken.userId, function (err, user) {
    //         console.log(user);
    //         res.status(200);
    //         res.send();
    //       });
    //   }
    // });

    // console.log(req.accessToken)
    var AccessToken = app.models.AccessToken;
    var token       = new AccessToken({
      id: req.query['access_token']
    });
    // console.log( req.query['access_token'] );

    res.render('profile');
  });

  router.get('/videos', function(req, res) {

    // console.log('23');
    // console.log( req.accessToken.userId );

    // request('http://www.google.com', function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //   console.log(body) // Show the HTML for the Google homepage. 
    //   // var info = JSON.parse(body)
    //     // res.json(body);
    // } else {
    //       // res.json(error);
    // }

    // });


    res.render('videos');   
  });


  router.post('/videos', function(req, res) {
    var email    = req.body.email;
    var password = req.body.password;
    // console.log(email, password);

    app.models.UserModel.login({
      email: email,
      password: password
    }, 'user', function(err, token) {

      if (err) {
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });
      }  

      token = token.toJSON();

      console.log( token );
      console.log( token.userId );
      // res.render('profile', {
      //   username: token.user.username,
      //   accessToken: token.id
      // });


      res.render('videos', {
        username: token.user.username,
        userId: token.user.id,
        accessToken: token.id
      });

    });
  });


  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token       = new AccessToken({
      id: req.query['access_token']
    });
    token.destroy();

    res.redirect('/');
  });

  app.use(router);

};