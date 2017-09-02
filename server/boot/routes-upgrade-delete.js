'use strict';

var request = require('request');


// Routes, related to ejs view engine
// So, they don't work well, because we're using pug view engine right now
module.exports = function(server) {

  var router  = server.loopback.Router();

  var Video   = server.models.VideoModel;
  



  router.post('/profile', function(req, res, next) {
    var email    = req.body.email;
    var password = req.body.password;
    // console.log(email, password);


    server.models.UserModel.login({
      email: email,
      password: password
    }, 'user', function(err, token){

      if( err ){
        res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });  
      }

      token = token.toJSON();

      // console.log( token );

      server.models.VideoModel.listVideosByUser(token.user.id, function(err, videos){

        if(err) throw err;
        // console.log( videos );


        res.render('profile', {
          username: token.user.username,
          userId: token.user.id,
          accessToken: token.id,
          videoArray: videos
        });

      });





    });





  });

  router.get('/logout', function(req, res, next) {

    if( !req.accessToken ) { return res.sendStatus(401); } // unauthorized 

    server.models.UserModel.logout(req.accessToken.id, function(err){
      if (err) return next(err);
      
      res.redirect('/index'); //redirect on successful logout     
    });

  });



  server.use(router);

};