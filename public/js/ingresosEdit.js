$(document).ready(() => {
    $('#ingreso-edit').on('submit', (event) => {

        updateingresos($('#ingreso-edit').serialize());
    });
    function updateingresos(formData){
        $.ajax({
            type:'POST',
            url:'/actualizar',
            data: formData,
            success: (data) => {
              alert(data.message);

            },
            error: (jqXHR, textStatus, err) => {
              alert('text status ' + textStatus + ', err ' + err);
            }
          });
    }
});