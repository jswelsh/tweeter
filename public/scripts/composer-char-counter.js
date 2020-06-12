
$(document).ready(function() {
  //character counting function, alerts user if
  //they exceed the maximum allowable char count
  //for tweet
  $('#tweeterText').keyup('click', function() {
    const maxLength = 140;
    $('#counter').html(maxLength);
    const textLength = $('#tweeterText').val().length;
    const remaining = maxLength - textLength;

/*     if (remaining < 0) {
      $('#counter').html(`<font color="red"> Max char: ${remaining}</font>`);
    } else {
      $('#counter').html(remaining);
    } */
/*     (remaining < 0) ?
      $('#counter').html(`<font color="red"> Max char: ${remaining}</font>`) : 
      $('#counter').html(remaining); */
      $('#counter').html( (remaining < 0) ? `<font color="red"> Max char: ${remaining}</font>` : remaining )

  });
});
 
