/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Hard coded Tweet Database


  $(document).ready(function() {
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];



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
    
  renderTweets(data);
  // Test / driver code (temporary)
   // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});


  // Post Tweet Ajax 

  $("form").on("submit", function(event){
      event.preventDefault();
      let formData = $("for#tweet-form").serialize(); // Grab content of form
      $.ajax("/tweets", {method:POST, data:formData} // submit using ajax
      ).then(function(){ // clear form
        $("form#tweet-form input").val('');
        $(".tweet-id").empty();

        return $.ajax('/tweets');
      }).then(renderTweets)
    });

