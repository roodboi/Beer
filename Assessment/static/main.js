
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
       })



    function resultsLoop(data){

           $.each(data.items,function(i, item){

           var thumb = item.snippet.thumbnails.medium.url;
           var title = item.snippet.title;
           var desc = item.snippet.description.substring(0,100);
           var vid = item.id.videoId;

           $('main').append(`
                   <article class="item" data-key="${vid}">
            <img src="${thumb}" alt="" class="thumb">
            <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
            </div>
        </article>
           `)
           });


    }

    $('main').on('click','article',function(){
            var id = $(this).attr('data-key');
            mainVid(id);
           });



});