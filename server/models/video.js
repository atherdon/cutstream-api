'use strict';

module.exports = function(Video) {

	Video.validatesPresenceOf(
		'title', 'url', 'start', 'end', 'step', 'created_at', 'updated_at'
	);

	var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	UserModel.validatesFormatOf('url', {with: re, message: 'url should be a valid YouTube link'});

	// YouTube url custom validation
	// Video.validate('url', youtubeValidator, {
	// 	message: 'url should be a valid YouTube link'
	// });

 //    function youtubeValidator(err) {
 //      if( matchYoutubeUrl( this.url ) ) {
 //        err();
 //      }
 //    }

 //    function matchYoutubeUrl(url) {
	//     var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	//     var matches = url.match(p);
	//     if(matches){
	//         return matches[1];
	//     }
	//     return false;
	// }

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
