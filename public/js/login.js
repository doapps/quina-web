$(document).ready(() => {
  $('#login').on('submit', (event) => {
      event.preventDefault();
      ingresoLogin($('#login').serialize());
  });
  
  function ingresoLogin(formData){
    $.ajax({
      type: 'POST',
      url: '/login',
      data:formData,
      success: (data) => {
        if(data.message==='Datos Incorrectos'){  
          alert(data.message);
          window.location.href ="/login";
        }else {
          alert(data.message);
          window.location.href ="/tablausuarios";
        }
      },
      error: (jqXHR, textStatus, err) => {
        console.log('text status '+ textStatus + ', err ' + err);
      }
    });
  }
});
