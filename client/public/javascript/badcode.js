jQuery(document).ready(function() {	



   

  //  if (playerInstance.readyState() < 1) {
  //   // do not have metadata yet so loadedmetadata event not fired yet (I presume)
  //   // wait for loadedmetdata event
  //   playerInstance.one("loadedmetadata", onLoadedMetadata);
  // }
  // else {
  //     // metadata already loaded
  //     onLoadedMetadata(playerInstance);
  // }

   

//:todo test this later with other timemarks.

//:todo use this later - if user place to input url with start time.



//   var time = '1h1m15s';
   var time = '1m0s';
   
//   if( time.indexOf("h") !== -1 ){
//       
//   } 
//   var a1 = time.split('h');
//   var hours = a1[0];
//   hours = parseInt( hours, 10 );
   
   if( time.indexOf("m") !== -1 ){
       
   } 
   var a2 = time.split('m');
//   var a2 = a1[1].split('m');
   var minutes = a2[0];
   minutes = parseInt( minutes, 10 );
   
   if( time.indexOf("s") !== -1 ){
       
   } 
   var a3 = a2[1].split('s');
   var seconds = a3[0];
   seconds = parseInt( seconds, 10 );
   
//   console.log( time )
//   console.log( hours )
//   console.log( minutes )
//   console.log( seconds )
   
//   
//   var hoursToSeconds     = hours * 3600;
   var hoursToSeconds     = 0;
   var minutesToSeconds   = minutes * 60;
   var startTimeInSeconds = hoursToSeconds + minutesToSeconds + seconds;
   
   
   var EndTime            = 5; //5 seconds
   //TODO change it later to a real time
   //something like start time + end time --> convert to milliseconds and 

       //
   var milliseconds       = EndTime * 1000;

    
//   console.log( hoursToSeconds )
//   console.log( minutesToSeconds )
//   console.log( seconds )
//   console.log( startTimeInSeconds )
   
//   var minutes = 
   
//   console.log( '1h1m26s'.split('h') )
   
   
   var StartTime = $("#automaticallyStart").val(); 
    
    


    
    
    playerInstance.ready(function(){
        var player = this;
//       console.log('ddddddddddd');
       console.log( EndTime );


       // console.log( playerInstance.duration() )

        playerInstance.pause();
        
        player.currentTime( startTimeInSeconds ); // 1 minute into the video
//        player.pause();
        
        playerInstance.setTimeout(function(){
           console.log('tada');
           playerInstance.pause();
       },
//       5000
        milliseconds
       );
       
        
   })
   
   
//   если я нажму play после того, как плеер стал в паузу после endPoint - нужно запрещать проигрывать дальше.
//   можно сделать кнопку deleteEndPoint - чтобы потом изменять время
//   или сделать кнопку finalize & customize.
   
//   добавить страницу,
    
   $('#proceed').on('click', function(){
       
       var start = $("#start").val(); 
       var end   = $("#end").val();
       
       // get
       var whereYouAt = playerInstance.currentTime();
       
       // set
       playerInstance.currentTime( start ); // 1 minute into the video
//       playerInstance.currentTime( startTimeInSeconds ); // 1 minute into the video
       playerInstance.pause();
       
//       console.log( end );
//       console.log( end * 1000 );
       
       
       playerInstance.setTimeout(function(){
//           console.log('tada2');
           playerInstance.pause();
       },
       end * 1000
//       5000
//       milliseconds
       );
       
       

//        var lengthOfVideo = myPlayer.duration();
//        if(  )
//        myPlayer.pause();

       return false;
       
   });

		
}); /*end document*/

function convertToTime( string ){
    
    var time = false;
    
    
    
    return time;
    
}
//
//function a(){
//    
//}

  function onLoadedMetadata(playerInstance) {
      alert(playerInstance.duration());
      console.log( playerInstance.duration() );
  }