   var key = 'AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo'

   var globalData;

  $(document).ready(function() {

  //EventListener on button to redirect with new paramaters when clicked
      $(".button").click(function() {

            var text = $('#myText').val();
            // alert(text);
        var keyword = 'surf,';
        keyword+= text;

        var url = "/searchVids" + "?keyword=" + keyword;

         window.location = url;

      });


      initialFeed("")

    //This will populate the main section on the home page with videos
    function initialFeed(filterQuery){

         var qKey = $('.container').attr('data-key');
         console.log(qKey);


                var URL = "https://www.googleapis.com/youtube/v3/search";
        options = {
      part : 'snippet',
      type : 'video',
            q:qKey,
            maxResults:50,
      key: key};


    $.get(URL, options, function (data) {
        console.log(data);
        globalData = data;
        var ID = data.items[0].id.videoId;
        //ID = 'sIpbI0SQczM';
        var initialData = [];
        for (i = 0; i < 10; i++) {
            initialData.push(data.items[i])
        }
        console.log(initialData)
        resultsLoop(initialData);
    });

}

//Calling Method to populate homepage
    // initialFeed("")


        var counter = 10;
    //Function to create article elements and append to section
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

    //Function sets event listener on articles and redirects the page
    $('main').on('click','article',function(){
        //$("html").load("/video");

        var id = $(this).attr('data-key');
        var channel = $(this).attr('data-channel');

        var url = "/video" + "?id=" + id +"&channel="+channel;

         //window.location = "/video?username=alex&password=pw1";
         window.location = url;


    });


    //Function to filter out the videos based on input text
    $("#myInput").on("keyup", function() {

    var value = $(this).val().toLowerCase();

    $("h4").filter(function() {
      $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        //console.log(this.parent());
    });
  });


//Function to enable Infinite scrolling(Dynamically loading videos)
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