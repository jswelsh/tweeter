
$(document).ready(function() {
  //character counting function, alerts user if
  //they exceed the maximum allowable char count
  //for tweet as well as add color of overage
  $('#tweeterText').keyup('click', function() {
    const maxLength = 140;
    const textLength = $('#tweeterText').val().length;
    const remaining = maxLength - textLength;
    $('#counter').html( 
      (remaining < 0) ? `<font color="red"> Max char: ${remaining}</font>` : remaining 
    )
  });
});