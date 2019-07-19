// Fake data taken from initial-tweets.json
$(document).ready(()=>{

  const validTweetValidator = function() {
    let tweetContents = document.forms['tweetSubmit']['tweeterTextCounter'].value;
    if (tweetContents === "") {
      alert("Your tweet has no chirp, flex more chirp!");
      return false;
    } else if ((tweetContents.length) > 140) {
      alert("Your tweet has to much chirp, flex less chirp!");
      return false;
    }
    return true;
  };
  
  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(function(element) {
      console.log(element);
      let $tweet = createTweetElement(element);
      $('.tweets').append($tweet.html());
    });
  
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let tweetArticle =
    `<div>
      <h2>
        ${tweet.user.name}
      </h2>
      <h2>
        ${tweet.content.text}
      </h2>
    </div>`;
    return $tweet.html(tweetArticle);
  };
  $(function() {
    const $button = $('#tweetSubmit');
    $button.on('submit', (event) => {
      event.preventDefault();
      //console.log($('#tweetSubmit').serialize());
      console.log($('#tweetSubmit'));
      if (validTweetValidator()) {
        $.post($('#tweetSubmit').serialize(), (data) => {
          console.log(data);
        });
      }
    });
  });
  
  const loadTweets = function() {
    $.getJSON('http://localhost:8080/tweets', (tweetJSON) => {
      renderTweets(tweetJSON);
      //console.error(tweetJSON, "test");
    });
  };
  loadTweets();

});


