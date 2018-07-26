
$(document).ready(function(){


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

	    $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part : 'snippet',
      channelId : 'UC1vGZ4Voadn4F5R07GhbA5A',
      type : 'video',
      key: key},
      function(data) {
console.log(data);
    resultsLoop(data)
      }
  );

});
