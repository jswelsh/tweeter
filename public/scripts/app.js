// Fake data taken from initial-tweets.json
$(document).ready(()=>{

  const validTweetValidator = function(tweetContents) {
    if (tweetContents === "") {
      //$('.warning').css('visibility', 'visible');
      $('.warning').slideDown("slow");
      //alert("Your tweet has no chirp, flex more chirp!");
      $('.warning').text('Your tweet has no chirp, flex more chirp!');
      return false;
    } else if ((tweetContents.length) > 140) {
      //$('.warning').css('visibility', 'visible');
      $('.warning').slideDown("slow");
      //alert("Your tweet has no chirp, flex more chirp!");
      $('.warning').text('Your tweet has to much chirp, flex less chirp!');
      //alert("Your tweet has to much chirp, flex less chirp!");
      return false;
    }
    $('.warning').slideUp("slow");
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
   // let tweetText = (tweet.content.text);
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
        $.post('/tweets', $('.tweetSubmit').serialize(), (data) => {
      
          loadTweets(1);
        });
      }
    });
  });

  $(function() {
    const $button =$(".newTweetButton");
    
    $button.click(function(){
      event.preventDefault();
      $(".new-tweet").slideToggle("slow");
  });
  });
  
/*   const loadTweets = function(size) {
    $.getJSON('http://localhost:8080/tweets', (tweetJSON) => {
      renderTweets(tweetJSON);
      //console.error(tweetJSON, "test");
    });
  };
  loadTweets(); */
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


