var URL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo&part=snippet&type=video&q=surf";
   var key = 'AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo'


    var playlistId = 'PL8QlzjBVZXjRhCJSyT038EHWUpDzV5Xz6'

   var options = {
       part: 'snippet',
       key:key,
       maxResults:20,
       playlistId:playlistId
   }

$(document).ready(function(){


       $.get(URL, options, function (data){
           console.log(data);
           var ID = data.items[0].id.videoId;
            //ID = 'sIpbI0SQczM';
            resultsLoop(data);
       });



    function resultsLoop(data){

           $.each(data.items,function(i, item){

           var thumb = item.snippet.thumbnails.medium.url;
           var title = item.snippet.title;
           var desc = item.snippet.description.substring(0,100);
           var channel = item.snippet.channelId;
           var vid = item.id.videoId;

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

    function mainVid(ID) {
        $('#video').html(`
        
                <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${ID}"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>       
        `);
    }
    $('main').on('click','article',function(){
        //$("html").load("/video");

        var id = $(this).attr('data-key');
        var channel = $(this).attr('data-channel');
        //Also want channel ID

        var url = "/video" + "?id=" + id +"&channel="+channel;

         //window.location = "/video?username=alex&password=pw1";
         window.location = url;


    });

    $('main').on('click','article',function(){
            var id = $(this).attr('data-key');
            mainVid(id);
           });



});