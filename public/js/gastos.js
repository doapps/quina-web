$(document).ready(() => {
    $('#gastoslistar').on('submit', (event) => {
        let tipoingreso=$('input[name=contact1]:checked').val();
        let tipomoneda=$('input[name=contact2]:checked').val();
        let comprobante=$('input[name=contact3]:checked').val();
        let modalidadpago=$('#modalidadpago').val();
        let titular=$('#titularr').val();
        let cuentanumero=$('#Cuentanumero').val();

        event.preventDefault();
  if(($('.ingreso').is(':checked') || $('.ingreso2').is(':checked')) && ($('.moneda').is(':checked') || $('.moneda2').is(':checked')) && ($('.Comprobante').is(':checked') || $('.Comprobante2').is(':checked'))){
      if(modalidadpago === null && titular === null && cuentanumero === null){
        alert("Complete todos los datos no debe haber campos vacios");
      }else{
            insertgastos($('#gastoslistar').serialize());
            location.reload();
      }
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
      },
      error: (jqXHR, textStatus, err) => {
        alert('text status ' + textStatus + ', err ' + err);
      }
    });
 } 


});