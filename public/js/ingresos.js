$(document).ready(() => {

    $('#listar-form').on('submit', (event) => {
       
      listar($('#listar-form').serialize());
    });
});

  function listar(formData){
    $.ajax({
      type:'POST',
      url:'/tablaingresos',
      data: formData,
      success: (data) => {
        alert(data.message);
        location.reload();
      },
      error: (jqXHR, textStatus, err) => {
        alert('text status ' + textStatus + ', err ' + err);
      }
    });

  }