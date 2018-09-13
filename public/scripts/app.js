/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Hard coded Tweet Database


  $(document).ready(function() { 
    loadTweets(); 
});
 function renderTweets(data) {
      
     data.forEach(function(tweet){
         $(".tweet-id").append(createTweetElement(tweet));
   
     })
         
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


  // Post Tweet Ajax 

  $("form").on("submit", function(event){
    event.preventDefault();
    let formData = $("for#tweet-form").serialize(); // Grab content of form
    if(formData === ''){
        alert('Tweet Cannot Be Empty!')
    }
    $.ajax("/tweets", {method:'POST', data:formData} // submit using ajax
    ).then(function(){ // clear form
      $("form#tweet-form input").val('');
      $(".tweet-id").empty();

      return $.ajax('/tweets');
    }).then(renderTweets)
  });
