'use strict';


var path   = require('path');

var app    = require(path.resolve(__dirname, '../server/server'));
var server = app.datasources.videoDS;

server.automigrate('User', function(err) {
  if (err) throw err;

  var accounts = [
    {
      name: 'john',	
      email: 'john.doe@ibm.com',
      password: 'john',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
	  name: 'jane',
      email: 'jane.doe@ibm.com',
      password: 'jane',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
	  name: 'admin',
      email: 'jane.doe@ibm.com',
      password: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },

  ];

  var count = accounts.length;
  accounts.forEach(function(account) {
    app.models.Account.create(account, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        server.disconnect();
    });
  });
});