'use strict';

module.exports = function(Video) {

	Video.validatesPresenceOf(
		'title', 'url', 'start', 'end', 'step', 'created_at', 'updated_at'
	);

	// YouTube url custom validation
	var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	Video.validatesFormatOf('url', {with: re, message: 'url should be a valid YouTube link'});

	// End Number must be greater than Start Number
	Video.validate('end', numberValidator, {
		message: 'end number should be greater then start number'
	});

    function numberValidator(err) {
      if(this.end >= this.start) {
        err();
      }
    }

};
