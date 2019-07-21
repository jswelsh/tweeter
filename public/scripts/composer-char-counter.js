console.log ("composer counter checked and linked");
$(document).ready(function() {
  $('#tweeterText').keyup('click', function() {
    let maxLength = 140;
    $('#counter').html(maxLength)
    let textLength = $('#tweeterText').val().length;
    let remaining = maxLength - textLength;
    if (remaining === 0) {
      $('#counter').html('Max!');
    } else {
    $('#counter').html(remaining);
    }
  });    
});
 
