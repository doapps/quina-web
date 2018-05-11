$(document).ready(() => {
    $('#gastoslistar').on('submit', (event) => {
        let tipoingreso=$('input[name=contact1]:checked').val();
        let tipomoneda=$('input[name=contact2]:checked').val();
        let comprobante=$('input[name=contact3]:checked').val();

        
  if(($('.ingreso').is(':checked') || $('.ingreso2').is(':checked')) && ($('.moneda').is(':checked') || $('.moneda2').is(':checked')) && ($('.Comprobante').is(':checked') || $('.Comprobante2').is(':checked'))){
    insertgastos($('#gastoslistar').serialize());
  }else{
    alert("Complete todos los datos no debe haber campos vacios");
  }
    });


    $('.gastos-buton').click((event) => {
        let confi = confirm('Esta seguro que desea eliminar');
        if (confi) {
          alert('Eliminado correctamente');
        } else {
          event.preventDefault();
        }
      });


  function insertgastos(formData){
    $.ajax({
      type:'POST',
      url:'/tablagastos',
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


});