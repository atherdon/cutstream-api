$(document).ready(function(){

	$('#maskToggler').on('click', function() {

		// console.log( $(this).data() );

		if( $(this).data().type == 'hours'){

			$("#inputEnd").inputmask("hh:mm:ss");
  			$("#inputStart").inputmask("hh:mm:ss"); //"hh:mm t": @todo test this option in order to set only one variable to hours.
			$(this).data('type', 'minutes');
			return false;
		}

		if( $(this).data().type == 'minutes'){

			$("#inputStart").inputmask("i:s");
  			$("#inputEnd").inputmask("i:s");
  			$(this).data('type', 'hours');
  			return false;
		}

	    return false;
	});


	$("#inputStart").inputmask("i:s");
	$("#inputEnd").inputmask("i:s");

	$('#formSubmitVideo').submit(function(){

		var start = $("#inputStart").val();
		var end   = $("#inputEnd").val();

		var partsS = start.split(":");

		var isHours = ( partsS.length == 3 ) ? true : false;

		if( isHours ){


		} else {

			start = '00:' + start ;
			end   = '00:' + end ;
			//@todo move it to object below later
		}

		// console.log(start);
		// console.log(end);

		var TimeStart = {
			hours   : 0,
			minutes : 0,
			seconds : 0,
			total   : 0,
			string  : '',
			parts   : [],

			countTotal: function(){

			  
			  var hoursToSeconds     = this.hours * 3600;

			  var minutesToSeconds   = this.minutes * 60;
			  var TimeInSeconds = hoursToSeconds + minutesToSeconds + this.seconds;

			  // console.log( hoursToSeconds );
			  // console.log( minutesToSeconds );
			  // console.log( TimeInSeconds );

			  this.total = TimeInSeconds;



			},
			toMiliseconds: function(){
				return this.total * 1000;
			},

			init: function( value ){

				this.string = value;

				this.split();
				this.clean();
				this.convert();
				this.countTotal();
				
				// 3. .replace(/h/g, '0')
			},

			split: function(){
				this.parts = this.string.split(":");
			},

			clean: function(){

				// console.log(this.parts);
				var badya = [];

				$.each( this.parts, function(i,v){

					var new1 = v.replace('s', '0');
					new1     = new1.replace('m','0');
					new1     = new1.replace('h','0');

					badya[i] = new1;
				});


				this.parts = badya;

			},

			convert: function(){
				this.hours   = parseInt( this.parts[0], 10 );
				this.minutes = parseInt( this.parts[1], 10 );
				this.seconds = parseInt( this.parts[2], 10 );

				// console.log( this.hours );
				// console.log( this.minutes );
				// console.log( this.seconds );
			},


		}


		var startInSec, endInSec;

		TimeStart.init(start);
		startInSec = TimeStart.total;

		TimeStart.init(end);
		endInSec   = TimeStart.total;

		// console.log( startInSec, endInSec );

		$("#hiddenStart").val( startInSec );
		$("#hiddenEnd").val( endInSec );

	});

});


