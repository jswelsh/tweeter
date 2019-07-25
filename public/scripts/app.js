// Fake data taken from initial-tweets.json
$(document).ready(()=>{

  const validTweetValidator = function(tweetContents) {
    if (tweetContents === "") {
      $('.warning').slideDown("slow");
      $('.warning').text('Your tweet has no chirp, flex more chirp!');
      return false;
    } else if ((tweetContents.length) > 140) {
      $('.warning').slideDown("slow");
      $('.warning').text('Your tweet has to much chirp, flex less chirp!');
      return false;
    }
    $('.warning').slideUp("slow");
    return true;
  };
  //escapes input that can cause crosssite scripting
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(function(element) {
      let $tweet = createTweetElement(element);
      $('.tweets').append($tweet);
    });
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  //generates new tweet markup
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweetBox');
    let safeText = escape(tweet.content.text)    
    console.log(tweet);
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
  
  $(function() {
    const $button = $('.tweetSubmit');
    $button.on('submit', (event) => {
      event.preventDefault();
      const tweet = (document.forms['tweetInputField']['tweeterText'].value);
      if (validTweetValidator(tweet)) {
        $.post('/tweets', $('.tweetSubmit').serialize(), (data) => {
          //incase if a new tweet is submitted
          loadTweets(1);
        });
      }
    });
  });

  function loadTweets(size){
    $.get('http://localhost:8080/tweets', (function (tweets) {
      if (size) {
        renderTweets(tweets.slice(tweets.length-1));
      } else {
        renderTweets(tweets);
      }
    }));
  };
  loadTweets();
});

  

