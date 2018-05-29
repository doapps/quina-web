$(document).ready(() => {
    $('#gastos-edit').on('submit', (event) => {
        let tipoingreso=$('input[name=contact1]:checked').val();
        let tipomoneda=$('input[name=contact2]:checked').val();
        let comprobante=$('input[name=contact3]:checked').val();

        event.preventDefault();
    if(($('.ingreso').is(':checked') || $('.ingreso2').is(':checked')) || ($('.moneda').is(':checked') || $('.moneda2').is(':checked')) || ($('.Comprobante').is(':checked') || $('.Comprobante2').is(':checked'))){
        actualziargastos($('#gastos-edit').serialize());
        location.reload();
    }else{
      alert("Complete todos los datos no debe haber campos vacios");
    }
});


$('#moneda').on('keyup keypress', (event)=>{

    let moneda = $('#moneda').val();
    let keycode = event.keyCode;

  var contar=0;
  if(moneda.charAt(0) == '.'){
    $('#moneda').val('');
  }
  if((keycode > 47 && keycode < 58) || keycode== 8 || keycode == 13 || keycode== 6 || keycode == 46 ){
      for (let index = 0; index < moneda.length; index++) {
            if(moneda.charAt(index) == '.'){
              contar++;
              if(contar == 2){
                let dividir = moneda.substring(0,moneda.length-1);
                $('#moneda').val(dividir);
                event.preventDefault();
              }
            }
      }
  }else{
    event.preventDefault();
  }
});

  

  function actualziargastos(formData){
    $.ajax({
      type:'POST',
      url:'/gastos/editar',
      data: formData,
      success: (data) => {
        alert(data.message);
        window.location.href ="/gastos";
      },
      error: (jqXHR, textStatus, err) => {
        alert('text status ' + textStatus + ', err ' + err);
      }
    });
 } 


});