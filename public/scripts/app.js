// Document Ready Function

  $(document).ready(function() { 
    loadTweets(); 
  //hide tweet box on Page load along with Error Messages
    $(".new-tweet").hide();
    $('#error-max').hide();
    $('#error-empty').hide();

    ///slide toggle on compose buttin
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
    let formText = $('#textBoi').val();

    if(formText.length < 1){        // error messages when form is submitted
        $('#error-empty').show();
        $('#error-max').hide();
    } else if (formText.length > 140){
       $('#error-max').show();
       $('#error-empty').hide();
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

// Render Tweets in revers chronological order
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


// Function to conver unix timestamp to relative time
function timeSince(date) {
    var currentDate = Date.now();
    var howLongAgoSeconds = (currentDate - date) / 1000 / 60;
    var howLongAgoMinutes = (currentDate - date) / 1000 / 60;
    var howLongAgoHours = (currentDate - date) / 1000 / 60 / 60;
    if (howLongAgoMinutes < 1) {
      return `${Math.floor(howLongAgoSeconds)} seconds ago`;
    } else if (howLongAgoMinutes > 1 && howLongAgoMinutes < 60) {
      return `${Math.floor(howLongAgoMinutes)} minutes ago`;
    } else if (howLongAgoMinutes > 60 && howLongAgoHours < 24) {
      return `${Math.floor(howLongAgoHours)} hours ago`;
    } else if (howLongAgoHours > 24) {
      return `${Math.floor(howLongAgoHours / 24)} days ago`;
    }
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
    <p>${timeSince(`${tweetData.created_at}`)}</p>
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



