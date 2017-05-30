'use strict';


var path        = require('path');

let app         = require(path.resolve(__dirname, '../server/server'));
var database    = app.datasources.videoDS;

//creating loopback necessary tables if no exists
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'UserModel', 'VideoModel'];
database.automigrate(lbTables, function(err) {
// database.autoupdate(lbTables, function(err) {	
  if (err) throw err;

  console.log( 'Loopback tables [' + lbTables.toString() + '] created in ' + database.adapter.name );
  database.disconnect();
});
