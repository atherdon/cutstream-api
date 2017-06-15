var PlayerReptiloid = '';
// var slug            = '';
$(document).ready(function(){


	playerInit();

});

function playerInit(){

	var options = populateWithOptions();
	var yt_int, yt_player,  //@todo replace reptiloid with yt_player variable and check 
	    initYT = function() {

	    	// console.log('piarastia');
	    	 
        PlayerReptiloid = new YT.Player('hiddenPlayer', options);
      
	        
	    };

   
 	$.getScript("//www.youtube.com/player_api", function() {
	    yt_int = setInterval(function(){
	        if(typeof YT === "object"){
	            initYT();
	            clearInterval(yt_int);
              // console.log( PlayerReptiloid );
              // PlayerReptiloid.pauseVideo();
	        }
	    }, 500);
	});




}

function sliderInitialization(){

	//@todo try to calculate step using duration for reducing elements
	//@todo we can remove duration things from urls, parameters
  var data = $('.sliders_step1').data();
  // console.log(data.edit);
  if( !data.edit ) return false; //this stuff work for view player only state. @todo deal with data-edit variable. don't like it

  

  displayVideoInformation();


  // if( !$('.sliders_step1').length ){ return false; }


	var min    = data.min;
	var max    = data.duration;

	var start  = data.start;
	var end    = data.end;

	var values = [start, end];

  // duplicated at cropSize. used only for bug.
  var between = parseInt( data.end, 10 ) - parseInt( data.start, 10 );

  if( between < data.step ){
    var step  = 1;
  } else {
    var step  = data.step;  
  }

  

	$("#slider-range").slider({
  
      range : true,
      min   : min,
      max   : max,
      step  : step,
      values: values,

      slide: function (e, ui) {
        
        PlayerReptiloid.pauseVideo();

        //@todo move this to global objects and use it like at displayVideoInformation()
        //case start time update
        var first_elem_html = calculationDisplanation( ui.values[0], step );
        $('.slider-time1').html( first_elem_html );

        // case end time update
        var second_elem_html = calculationDisplanation( ui.values[1], step );
        $('.slider-time2').html( second_elem_html );

        // case display crop time
        var cropSize = durationCalculation( ui.values );
        $('#crop-size').html( calculationDisplanation( cropSize, step ) );

        // case update form values for 'video update functionality'
        //@todo if slider vas touched, but user want to close this page without hit update - add message - your changes wouldn't be applied
		    $('#inputStart').val( ui.values[0] );
        $('#inputEnd').val(   ui.values[1] );

        YouTubeloadvideo(PlayerReptiloid, ui.values[0], ui.values[1]);

      }
  });

}

//@todo apply duration as data attribute to slider. will remove a lot of unimportant things
function displayVideoInformation(){

	//when we see page in first time we'll have ugly time

	// var data = $('.sliders_step1').data();
	// if( !data ){ return false; }

  var cropObject = {
    start   : false,
    end     : false,
    cropSize: false,
    selector: '#crop-size',
    result  : false,

    init: function(){

        var data   = $('.sliders_step1').data();
        this.start = parseInt( data.start, 10 );
        this.end   = parseInt( data.end, 10 );
        this.cropSize = this.end - this.start;

        var html = calculationDisplanation( this.cropSize, data.step );
        // console.log(html);

        // case display crop time
        $(this.selector).html( html );

        if( html ) { this.result = true; }
        // if( !html ) retun false;

        // return true;
    }
  }

  var durationObject = {   
    duration: false,
    selector: '#duration',
    result  : false,

    init: function(){
        var data      = $('.sliders_step1').data();
        this.duration = data.duration;

        var html = calculationDisplanation( this.duration, data.step );
        // console.log(html);

        // case display full youtube video duration value
        $(this.selector).html( html );


        if( html ) { this.result = true; }

        // return true;
    }
  }

  var timeRange = {
    start:false,
    end  :false,
    selectorStart: $('.slider-time1'),
    selectorEnd  : $('.slider-time2'),

    init: function(){

        var data   = $('.sliders_step1').data();
        this.start = data.start;
        this.end   = data.end;
        // this.selectorStart = ;
        // this.selectorEnd   = ;
        var first_elem_html  = calculationDisplanation( this.start, data.step );
        var second_elem_html = calculationDisplanation( this.end, data.step );

        this.selectorStart.html( first_elem_html );
        this.selectorEnd.html( second_elem_html );

    }
  }



  cropObject.init();
  durationObject.init();
  timeRange.init();



  // if duration and crop calculated properly - we'll display time slider 
  if( cropObject.result && durationObject.result ){ 
    $('#time-range').removeClass('hide');  
  }

  

}


//@todo remove step stuff. will be not necessary soon
function calculationDisplanation( value, step ){
  
  // console.log( value + ' seconds ' );

  if( !step ){ console.log('step value is undefinded'); }

  if( step == 1 ){

    var minutesA = Math.floor( value / 60);
    var secondsA = value - (minutesA * 60);
    var html = '';      
       // console.log( minutesA );
       // console.log( secondsA );

   if( minutesA ){
        html += minutesA + ":" ; 
   } else {
        html += '00:';
   }

   if( secondsA ){
       secondsA = addZeroBeforeTime(secondsA);
       // if( secondsA < 10 ){ secondsA = "0" + secondsA; }
        html += secondsA;
   } else {
        html += '00';
   }

    
       // console.log( html );
       return html;


  }
  
  if( step == 60 ){
    
    var minutesA = Math.floor( value / 60);
    var secondsA = value - (minutesA * 60);
    var html = '';      

   // console.log( minutesA );
   // console.log( secondsA );

   if( minutesA ){
    minutesA = addZeroBeforeTime(minutesA);
     // if( minutesA < 10 ){ minutesA = "0" + minutesA; }
        html += minutesA + ":" ; 
   } else {
        html += '00:';
   }

   if( secondsA ){
    // secondsA = addZeroBeforeTime(secondsA);
       
        html += secondsA;
   } else {
        html += '00';
   }
     // console.log( html );
    return html;  

  }
  
  if( step == 300 ){
    
       var hoursA   = Math.floor( value / 3600);
       var minutesA = (value/60) - (hoursA * 60);
       var html = '';  

       if( hoursA ){
            html += hoursA + ":";
       }        

       if( minutesA ){
            minutesA = addZeroBeforeTime(minutesA);

            html += minutesA + ":00" ; 
       } else {
            html += '00:00';
       }

       // if( secondsA ){
       //      html += secondsA;
       // } else {
       //      html += '00';
       // }

       // console.log( html );
       return html;

  }
  
  return html;
  
}

function durationCalculation( values ){

    var totalSeconds = values[1] - values[0];

    // console.log(totalSeconds);

    var durationMinutes = Math.floor(totalSeconds / 60);

    // console.log(durationMinutes);    
    durationSeconds = totalSeconds - (durationMinutes * 60);
    durationSeconds = addZeroBeforeTime(durationSeconds);
    
    // console.log(durationSeconds);    
    
    $('.duration').html( durationMinutes + ':' + durationSeconds +  ' sec' );

    return totalSeconds;

}

function addZeroBeforeTime( value ){
    if( value < 10) {
        value = '0' + value;
    }
    return value;
}

// *** Player's related functions

function populateWithOptions(){

	var slug = $("#slug").val();


	// console.log(slug);

	var options = {

		height: '390',
		width : '640',

		videoId: slug,
		playerVars: {
			rel: 0,
			enablejsapi: 1,
      controls: 0,
		}, //remove relative videos after stop function and add ability to kick ass

		events: {
	       'onReady': onReadyEvent,
			   'onStateChange': onPlayerStateChange,
		    // 'onApiChange': onApiChangeEvent,
		}
		


	};

	// console.log(options);

	return options;
}

function onReadyEvent(event){

  // console.log(event.target.getDuration );	

	callVideoReload(event);

  // console.log(event.target );
  // console.log(event.target.getDuration() );

  sliderInitialization();
	
	// console.log( event.target.pauseVideo() );
	
	// console.log( $('#padaboom').prop('href') );

	// var href = $('#padaboom').prop('href', $('#padaboom').prop('href') + event.target.getDuration() );

	// YouTubeloadvideo(player, 60, 67);
	// player.play();





}

function onApiChangeEvent (event){


	if (event.data === YT.PlayerState.ENDED) {


		//load same video and set start & end points



		// var start  = $('');
		// var end    = $('');
		// var player = event.target;
		// YouTubeloadvideo(player, start, end);
		// callVideoReload(event)

          // console.log(index);
        //   if (index < videos.length - 1) {

        	// run same video from start 

            // event.target.loadVideoById({
            //   videoId: videos[index].vid,
            //   startSeconds: videos[index].startSeconds,
            //   endSeconds: videos[index].endSeconds
            // });
        //     index++;
        // }

    }


    // when user pause video via controls
    // when we call pause via js

    if (event.data === YT.PlayerState.PAUSED) {

    	console.log('pause');
    	console.log($('').val());

    	var flag = $('').val();
    	if( flag ){
    		console.log('paused outside');

    	// var start  = $('');
		// var end    = $('');
		// var player = event.target;
		// YouTubeloadvideo(player, start, end);
		// callVideoReload(event)

    	} else {
    		console.log('paused by controls');
    	}




    }

}

function onPlayerStateChange (event){

	if (event.data === YT.PlayerState.ENDED) {

		//load same video and set start & end points

		callVideoReload(event);

    }


}

function YouTubeloadvideo(player, start, end) { 

	// console.log(player);
	// console.log(start);
	// console.log(end);
	var slug = $("#slug").val();

	//@todo maybe move data(). variables to this function
	player.loadVideoById({

		videoId         : slug,
        startSeconds    : start, //60,
        endSeconds      : end, //67,
        suggestedQuality: 'medium'
    });

    // console.log('badaboom');

}

function callVideoReload(event){

    

  $('.sliders_step1').data('duration', event.target.getDuration());
    

  var data = $('.sliders_step1').data();
    // console.log( data );
    // console.log(event.target.getDuration());

    // if( !data ){ return false; }

	//TimeInSeconds
  start = data.start;

  //TimeInSeconds
  end   = data.end;

    // var slug = $("#slug").val(); //@todo move slug to sliders data attribute or replace with some else method
    // console.log( slug );

  var player = event.target;


  player.pauseVideo();
    // console.log(startTimeInSeconds);
    // console.log(endTimeInSeconds);
    // console.log(player.getDuration());
    // console.log(data);

	YouTubeloadvideo(player, start, end);

	// }



}

function callVideoReloadSlider(start, end){


}