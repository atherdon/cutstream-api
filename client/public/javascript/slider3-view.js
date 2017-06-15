var PlayerReptiloid = '';

$(document).ready(function(){

	playerInit();
	
});

function playerInit(){

	var options = populateWithOptions();
	var yt_int, yt_players = {}, PlayerReptiloid,
	    initYT = function() {

	    	// console.log('pidarastia');
	    	 
        	PlayerReptiloid = new YT.Player('hiddenPlayer', options);
      	
	  
	        
	    };

   
 	$.getScript("//www.youtube.com/player_api", function() {
	    yt_int = setInterval(function(){
	        if(typeof YT === "object"){
	            initYT();
	            clearInterval(yt_int);
              
	        }
	    }, 500);
	});


  // PlayerReptiloid.pauseVideo();
  // console.log('jaga!');

	// $('#pidorlive').on('click', function(){


	// 	// console.log( PlayerReptiloid );
	// 	PlayerReptiloid.playVideo(); 

	// 	var slug = $("#slug").val();

	// 	PlayerReptiloid.loadVideoById({
 //              videoId: slug,
 //              startSeconds: 160,
 //              endSeconds: 167
 //            });		

	// 	return false;

	// });


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
			enablejsapi: 1
		}, //remove relative videos after stop function and add ability to kick ass

		events: {
	        'onReady': onReadyEvent,
	        'onStateChange': onPlayerStateChange,			
		}
		


	};

	// console.log(options);

	return options;
}

function onReadyEvent(event){

	
	callVideoReload(event);

	
	// console.log( event.target.pauseVideo() );
	
	// console.log( $('#padaboom').prop('href') );

	// var href = $('#padaboom').prop('href', $('#padaboom').prop('href') + event.target.getDuration() );

	// YouTubeloadvideo(player, 60, 67);
	// player.play();





}

function onPlayerStateChange (event){

	if (event.data === YT.PlayerState.ENDED) {

		//load same video and set start & end points
		// console.log('reload');
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
        endSeconds      : end,   //67,
        suggestedQuality: 'medium'
    });

	// player.pauseVideo(); // Disabled this, because I decide that when player is loaded - we need to run video. if we'll want to start with paused video - just need to enable it.
    // console.log('badaboom');

}

function callVideoReload(event){

    var data = $('.sliders_step1').data();

	//TimeInSeconds
    start = data.start;

    //TimeInSeconds
    end   = data.end;

    // var slug = $("#slug").val();
    // console.log( slug );

	var player = event.target;


  	// player.pauseVideo(); // Disabled this, because I decide that when player is loaded - we need to run video. if we'll want to start with paused video - just need to enable it.


    // console.log(startTimeInSeconds);
    // console.log(endTimeInSeconds);
    // console.log(data);
    // console.log(data);

	YouTubeloadvideo(player, start, end);

	// }



}

function callVideoReloadSlider(start, end){


}