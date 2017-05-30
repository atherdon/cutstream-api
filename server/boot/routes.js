'use strict';

var request = require('request');

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
    res.render('profile');
  });

  router.get('/videos', function(req, res) {


request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
    // var info = JSON.parse(body)
  res.json(body);
      } else {
        res.json(error);
      }
})


    res.render('videos');   
  });


  router.post('/videos', function(req, res) {
    var email    = req.body.email;
    var password = req.body.password;
    console.log(email, password);

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