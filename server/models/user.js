'use strict';

module.exports = function(User) {

	User.validatesPresenceOf('name');
    // user.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
    // user.validatesUniquenessOf('email', {message: 'email is not unique'});
};
