$(document).ready(() => {
    $('#ingreso-edit').on('submit', (event) => {
        let titulo=$('#titulo').val();
        let descripcion=$('#descripcion').val();
        let social=$('#razon').val();
        let tipoingreso=$('input[name=contact1]:checked').val();
        let tipomoneda=$('input[name=contact2]:checked').val();
        let monto=$('#moneda').val();
        let numero=$('#numerodocumento').val();
        let tipodocumento=$('input[name=contact3]:checked').val();




    if(($('.ingreso').is(':checked') || $('.ingreso2').is(':checked')) && ($('.moneda').is(':checked') || $('.moneda2').is(':checked')) && ($('.documento').is(':checked') || $('.documento2').is(':checked'))){
            if(/^([0-9])*$/.test(social) === true){
                alert("No se aceptan numeros en el campo de Razon Social");
            }else{
                if(tipodocumento==="DNI"){
                    if(numero.length===8){
                        updateingresos($('#ingreso-edit').serialize());
                    }else{
                        alert("El Numero de DNI debe tener 8 digitos");
                    }
                }else if(tipodocumento==="Ruc"){
                    if(numero.length===11){
                        updateingresos($('#ingreso-edit').serialize());
                    }else{
                    alert("El Numero de ruc debe tener 11 digitos");
                    }
                }
            }
    }else{
        alert("Complete todos los datos no debe haber campos vacios");
    }

 }
    
);
    function updateingresos(formData){
        $.ajax({
            type:'POST',
            url:'/actualizar',
            data: formData,
            success: (data) => {
              alert(data.message);
              window.location.href ="/tablaingresos";
            },
            error: (jqXHR, textStatus, err) => {
              alert('text status ' + textStatus + ', err ' + err);
            }
          });
    }
});