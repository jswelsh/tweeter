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


//tracks tweets and updates them
$(document).ready(()=>{
  const $button = $('.tweetSubmit');
  //catches user input
  $button.on('submit', (event) => {
    event.preventDefault();
    const tweet = (document.forms['tweetInputField']['tweeterText'].value);
    if (tweetValidator(tweet)) {
      $.post('/tweets', $('.tweetSubmit').serialize(), () => {
        //incase if a new tweet is submitted
        loadTweets(1);
      });
    }
  });
})