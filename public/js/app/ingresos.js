$(document).ready(() => {

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


    $('#numerodocumento').on('keyup keypress', (event)=>{
        let numero = $('#numerodocumento').val();
        let keycode = event.keyCode;
      if(keycode == '46'){
        event.preventDefault();
      }
      if((keycode > 47 && keycode < 58) || keycode== 8 || keycode == 13 || keycode== 6 || keycode == 46 ){
         
      }else{
         event.preventDefault();
      }
    });




    $('#listar-form').on('submit', (event) => {
      let titulo=$('#titulo').val();
      let descripcion=$('#descripcion').val();
      let social=$('#razon').val();
      let tipoingreso=$('input[name=contact1]:checked').val();
      let tipomoneda=$('input[name=contact2]:checked').val();
      let monto=$('#moneda').val();
      let numero=$('#numerodocumento').val();
      let tipodocumento=$('input[name=contact3]:checked').val();
      let cuenta=$('#listacuenta').val();
      let comprobante=$('#Comprobante').val();
        //alert(cuenta +"    "+comprobante);
      event.preventDefault();
  if(($('.ingreso').is(':checked') || $('.ingreso2').is(':checked')) 
  && ($('.moneda').is(':checked') || $('.moneda2').is(':checked')) &&
   ($('.documento').is(':checked') || $('.documento2').is(':checked'))){
            if(cuenta === null || comprobante === null){
                alert("Complete todos los datos no debe haber campos vacios");
            }else{
                if(/^([0-9])*$/.test(social) === true){
                    alert("No se aceptan numeros en el campo de Razon Social");
                }else{
                    if(tipodocumento==="DNI"){
                        if(numero.length===8){
                            listar($('#listar-form').serialize());
                            window.location.href ="/ingresos";
                        }else{
                            alert("El Numero de DNI debe tener 8 digitos");
                        }
                    }else if(tipodocumento==="RUC"){
                        if(numero.length===11){
                            listar($('#listar-form').serialize());
                            window.location.href ="/ingresos";
                            
                        }else{
                            alert("El Numero de ruc debe tener 11 digitos");
                        }
                    }
                }
            }
  }else{
      alert("Complete todos los datos no debe haber campos vacios");
  }
});


    $('.ingresos-tabla').click((event) => {
      let confi = confirm('Esta seguro que desea eliminar');
      if (confi) {
        alert('Eliminado correctamente');
      } else {
        event.preventDefault();
      }
    });

});



  function listar(formData){
    $.ajax({
      type:'POST',
      url:'/ingresos/crear',
      data: formData,
      success: (data) => {
        alert(data.message);
      },
      error: (jqXHR, textStatus, err) => {
        alert('text status ' + textStatus + ', err ' + err);
      }
    });
  }