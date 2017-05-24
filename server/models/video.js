'use strict';

module.exports = function(Video) {

	Video.validatesPresenceOf(
		'title', 'url', 'start', 'end', 'step', 'created_at', 'updated_at'
	);

};
