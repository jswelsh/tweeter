// Fake data taken from initial-tweets.json
$(document).ready(()=>{
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(function(element) {
      let $tweet = createTweetElement(element)
      console.log('TWEET ', $tweet)
      console.log($('.tweets'))
      $('.tweets').append($tweet.html())
    });
  
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  }
  
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
    $tweet.html(tweetArticle);
    return $tweet;
  }
  
  renderTweets(data);
})


  
$(function() {
  const $button = $('#tweetSubmit');
  $button.on('submit', (event) => {
    event.preventDefault();
    $.post($('#tweetSubmit').serialize(), (data) => {
      console.log(data);
    });
    
    
    /* , (post) => {
      appendPost(post); */
    console.log('Button clicked, performing ajax call...');
    console.log($('#tweetSubmit').serialize());
    });
  });