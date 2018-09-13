/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Hard coded Tweet Database


  $(document).ready(function() { 
    loadTweets(); 
  
    // Post Tweet Ajax 

  $("#tweet-form").submit( function(event){
    event.preventDefault();
    let post_url = $(this).attr('action');
    let request_method =$(this).attr('method');
    let formData = $(this).serialize(); // Grab content of form\
    if(formData.length < 6){
        alert('Please Fill tweet area!')
    } else if (formData.length > 149){
        alert("Max Length Exceeded!")
    }else {
    $.ajax({
        url: post_url,
        type: request_method,
        data: formData
    }).done(function(data){
        $('.tweet-id').append(loadTweets(data));
        console.log('Success Posted tweet to server');
     })};
    });

});
 function renderTweets(data) {
     data.forEach(function(tweet){
         var $tweet = createTweetElement(tweet);
        $(".tweet-id").prepend($tweet);
     })
         loadTweets();
 }
   
   // Creating New tweet Element via Jquery
function createTweetElement(tweetData){
    $tweet = $("<article>").addClass("tweet-class");
    let html = `
    <header>
    <img src="${tweetData.user.avatars.small}"/>
     <h1>${tweetData.user.name}</h1>
     <p>${tweetData.user.handle}</p>
    </header>
    <div class="tweet-place">
         <p>${tweetData.content.text}</p>
    </div>
    <footer class="footer">
    <p>${tweetData.created_at}</p>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </footer>
       `;
     $tweet =$tweet.append(html);
     return $tweet;
}
      
//Load tweets

function loadTweets() {
    $.ajax("./tweets", {method : 'GET'})
       .done(function(data) {
       renderTweets(data);
        })
       .fail(function(data) {
           alert('Failed');
        })
};



  