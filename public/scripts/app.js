/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Hard coded Tweet Database


  $(document).ready(function() { 
    loadTweets(); 
  //hide tweet box
    $(".new-tweet").hide();
    $('#error-max').hide();
    $('#error-empty').hide();

    ///slide toggle
    $("#compose").click(function() {
        $(".new-tweet").slideToggle(500);
        $("#textBoi").focus();
    });
    



    // Post Tweet Ajax 

  $("#tweet-form").submit( function(event){
    event.preventDefault();
    let post_url = $(this).attr('action');
    let request_method =$(this).attr('method');
    let formData = $(this).serialize(); // Grab content of form\
    let formText = $('#textBoi').val('');
    if(formText.length < 0){
        $('#error-empty').show();
    } else if (formText.length > 140){
       $('#error-max').show();
    }else {

    $.ajax({
        url: post_url,
        type: request_method,
        data: formData
    }).done(function(){
        loadTweets();
        $('#error-max').hide();
         $('#error-empty').hide();
       $("#textBoi").val('').empty();
       $(".counter").html("140")
        console.log('Success Posted tweet to server');
     })};
    });

});

// Render Tweets
 function renderTweets(data) {
     data.forEach(function(tweet){
         var $tweet = createTweetElement(tweet);
        $(".tweet-id").prepend($tweet);
        
     })
    
 }


   // Escape unsafe characters
   function escape(str) {
    var article = document.createElement('article');
    article.appendChild(document.createTextNode(str));
    return article.innerHTML;
   }

   // Creating New tweet Element via Jquery
function createTweetElement(tweetData){
    $tweet = $("<article>");
    let html = `
    <header>
    <img src="${tweetData.user.avatars.small}"/>
     <h1>${tweetData.user.name}</h1>
     <p>${tweetData.user.handle}</p>
    </header>
    <div class="tweet-place">
         <p>${escape(`${tweetData.content.text}`)}</p>
    </div>
    <footer class="footer">
    <p>${tweetData.created_at}</p>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </footer>
       `;
     $tweet.append(html).addClass("tweet-class");
     return $tweet;
}
      
//Load tweets

function loadTweets() {
    $.ajax("./tweets", {method : 'GET'})
       .done(function(data) {
       renderTweets(data);
        })
};



  