
$(document).ready(()=>{
  //check each tweet submitted and ensures it does not exceed
  //max character count nor is the tweet an empty field
  
  //escapes input that can cause crosssite scripting
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = function(tweets) {
    // loops through tweets to render
    tweets.forEach(function(element) {
      let $tweet = createTweetElement(element);
      //afix each new tweet to the the top of the the tweet section
      $('.tweets').prepend($tweet);
    });
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  //generates new tweet markup
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweetBox');
    //xss sanatization of user input text
    let safeText = escape(tweet.content.text);
    let tweetArticle =
  `
  <small class="hide" class="rightSide"> ${tweet.user.handle}</small>
    <header>
      <h2> ${tweet.user.name} </h2> 
    </header>  
      <img src= ${tweet.user.avatars}>
      <p>${safeText}</p>
    <footer>
      <time>${tweet.created_at}</time>
      <small class="rightSide"> links </small>
    </footer>
    </article>`;
    return $tweet.html(tweetArticle);
  };

  //registers click to hide tweet field button
  $("button").click(function() {
    $(".new-tweet").toggle(1000);
  });
  //grabs all stored tweets
  function loadTweets(size) {
    $.get('http://localhost:8080/tweets', (function(tweets) {
      if (size) {
        renderTweets(tweets.slice(tweets.length - 1));
      } else {
        renderTweets(tweets);
      }
    }));
  }
  loadTweets();
});

  

