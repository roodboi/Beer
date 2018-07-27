


    var playlistId = 'PL8QlzjBVZXjRhCJSyT038EHWUpDzV5Xz6'

   var options = {
       part: 'snippet',
       key:key,
       maxResults:50,
       playlistId:playlistId
   }

   var globalData;
$(document).ready(function(){


       $.get(URL, options, function (data){
           console.log(data);
           globalData = data;
           var ID = data.items[0].id.videoId;
            //ID = 'sIpbI0SQczM';
           var initialData = [];
           for(i = 0; i < 10; i++){
               initialData.push(data.items[i])
           }
           console.log(initialData)
            resultsLoop(initialData);
       });


        var counter = 10;
    function resultsLoop(data){

           //$.each(data.items,function(i, item){
           $.each(data,function(i, item){

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

        var url = "/video" + "?id=" + id +"&channel="+channel;

         //window.location = "/video?username=alex&password=pw1";
         window.location = url;


    });

    $('main').on('click','article',function(){
            var id = $(this).attr('data-key');
            mainVid(id);
           });


    $("#myInput").on("keyup", function() {

    var value = $(this).val().toLowerCase();

    $("h4").filter(function() {
      $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        //console.log(this.parent());
    });
  });



     $(window).scroll(function(){

    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {

        var initialData = [];
        var end = counter + 10;
        for(i = counter; i < end; i++){
               initialData.push(globalData.items[i])
           }
           counter = counter + 10;
           console.log(counter)
            resultsLoop(initialData);

  }

 });

});