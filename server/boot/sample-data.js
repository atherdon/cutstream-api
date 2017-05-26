'use strict';


module.exports = function(app) {

  var User        = app.models.user;
  var Role        = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  // var Team        = app.models.Team;

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
	  email: 'admin@ibm.com',
	  password: 'admin',
	  created_at: new Date(),
	  updated_at: new Date(),

	}
  ];

	User.create(accounts, function(err, users) {
		if (err) throw err;

		console.log('Created users:', users);
	});

	//create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      //make andy an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });

};