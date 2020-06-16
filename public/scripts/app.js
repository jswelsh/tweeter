
$(document).ready(()=>{

  function tweetValidator(tweetContents) {
    if (tweetContents === "") {
      //push down warning message
      $('.warning').slideDown("slow");
      $('.warning').text('Your tweet has no chirp, flex more chirp!');
      return false;
    } else if ((tweetContents.length) > 140) {
      //push down warning message
      $('.warning').slideDown("slow");
      $('.warning').text('Your tweet has to much chirp, flex less chirp!');
      return false;
    }
    //return warning to original position upon
    //proper input
    $('.warning').slideUp("slow");
    return true;
  };

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


  //tracks tweets and updates them
  const $button = $('.tweetSubmit');
  //catches user input
  $button.on('submit', (event) => {
    event.preventDefault();
    const tweet = (document.forms['tweetInputField']['tweeterText'].value);
    if (tweetValidator(tweet)) {
      $.post('/tweets', $('.tweetSubmit').serialize(), () => {
        //incase if a new tweet is submitted
        loadTweets(1);
        $(".new-tweet").toggle(1000);
      });
    }
  });

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

  

