// Fake data taken from initial-tweets.json
$(document).ready(()=>{

  const validTweetValidator = function(tweetContents) {
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
      let $tweet = createTweetElement(element);
      $('.tweets').append($tweet);
    });
  
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweetBox');
    let tweetArticle =
  `
    <header>
    <h2> ${tweet.user.name} </h2> 
      <small class="hide" class="rightSide"> ${tweet.user.handle}</small>
      <img src= ${tweet.user.avatars}>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
        <time>${tweet.content.created_at}</time>
      <small class="rightSide"> links </small>
    </footer>
  </article>`;
    return $tweet.html(tweetArticle);
  };
  
  $(function() {
    const $button = $('.tweetSubmit');
    $button.on('submit', (event) => {
      event.preventDefault();
      const tweet = (document.forms['tweetInputField']['tweeterText'].value);
      if (validTweetValidator(tweet)) {
        console.log(tweet)
        $.post('/tweets', $('.tweetSubmit').serialize(), (data) => {
          console.log(data);
          loadTweets();
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
/*   function loadTweets(size){
    $.ajax('http://localhost:8080/tweets', {method: 'GET'})
    .then(function (tweets) {
      if (size) {
        renderTweets(tweets.slice(tweets.length-1));
      } else {
        renderTweets(tweets);
      }
    });
  };
  loadTweets(); */

});


