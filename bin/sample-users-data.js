'use strict';

module.exports = function getSampleData (cb){

	var accounts = [	
		{
		  username: 'john',	
		  email: 'john.doe@ibm.com',
		  password: 'john1',

		},
		{
		  username: 'jane',
		  email: 'jane.doe@ibm.com',
		  password: 'jane1',
		},
		{
		  username: 'admin',
		  email: 'admin@ibm.com',
		  password: 'admin',

		}
  	];

  	return accounts;
  	// return cb(accounts);
}