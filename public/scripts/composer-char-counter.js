
$(document).ready(function() {
  //character counting function, alerts user if
  //they exceed the maximum allowable char count
  //for tweet
  $('#tweeterText').keyup('click', function() {
    let maxLength = 140;
    $('#counter').html(maxLength)
    let textLength = $('#tweeterText').val().length;
    let remaining = maxLength - textLength;
    if (remaining < 0) {
      $('#counter').html(`<font color="red"> Max char: ${remaining}</font>`);
    } else {
    $('#counter').html(remaining);
    }
  });    
});
 
