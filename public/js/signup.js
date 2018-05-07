$(document).ready(() => {
  $('#button-login').click(( event ) => {
    console.log('---> send form lol');
    $.ajax({
      type: 'POST',
      url: '/signup',
      // data: { mail: mail },
      success: (data) => {
        alert(data.message);
      },
      error: (jqXHR, textStatus, err) => {
        console.log('text status '+ textStatus + ', err ' + err);
      }
    });
  });
});
