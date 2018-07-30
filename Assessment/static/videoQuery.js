
//var key = "INSERT KEY HERE"


$(document).ready(function(){

    //Function to create article elements and append to section
    function resultsLoop(data){

           $.each(data.items,function(i, item){

           var thumb = item.snippet.thumbnails.medium.url;
           var title = item.snippet.title;
           var desc = item.snippet.description.substring(0,100);
           var vid = item.id.videoId;
           var channel = item.snippet.channelId;

           $('main').append(`
                   <article class="item" data-key="${vid}" data-channel="${channel}">
            <img src="${thumb}" alt="" class="thumb">
            <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
            </div>
        </article>
           `)
           });


    }
    var channel = $('section').attr('data-channel');

    //Get videos from same author and populate section

	    $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part : 'snippet',
      channelId : channel,
      type : 'video',
      key: key},
      function(data) {
console.log(data);
    resultsLoop(data)
      }
  );

//Fuction to get comments from video and display
	        function commentsLoop(data){

           $.each(data.items,function(i, item){

           var vid = item.id.videoId;

               var comment = item.snippet.topLevelComment.snippet.textDisplay;
               var name = item.snippet.topLevelComment.snippet.authorDisplayName;

           $('#comments').append(`
         <article class="comment" data-key="${vid}" >

            <div class="content">
                <h4>${name}</h4>
                <p>${comment}</p>
            </div>
        </article>
        
           `)
           });

    }

	    //Get Comments on Video
    var idComments = $('section').attr('data-key');
    var urlComments = "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo&textFormat=plainText&part=snippet&videoId="+ idComments

	      $.ajax({
        dataType: "jsonp",
        type: 'GET',
        url: urlComments,
        success: function(result){
            console.log(result);

            // console.log(data);
            commentsLoop(result)
    }});

    //Set event listener on videos to redirect correctly
    $('main').on('click','article',function(){
        //$("html").load("/video");

        var id = $(this).attr('data-key');
        var channel = $(this).attr('data-channel');

        var url = "/video" + "?id=" + id +"&channel="+channel;

         //window.location = "/video?username=alex&password=pw1";
         window.location = url;


    });


});
