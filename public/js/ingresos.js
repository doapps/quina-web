$(document).ready(() => {
    $('#listar-form').on('submit', (event) => {
        
        $.ajax({
            type: 'POST',
            url: '/tablaingresos',
            data: formData,
            success: (data) => {
              alert(data.message);
              location.reload();
            },
            error: (jqXHR, textStatus, err) => {
              alert('text status ' + textStatus + ', err ' + err);
            }
          });


    });


});
