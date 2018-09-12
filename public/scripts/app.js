/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Hard coded Tweet Database
const tweetData = {
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
  }
  
// Creating New tweet Element via Jquery
$(document).ready(function() {
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
    var $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet[0].outerHTML); // to see what it looks like
  $('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});


  