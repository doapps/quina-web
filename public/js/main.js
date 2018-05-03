$(document).ready(function () {
    
    $('#button-form-users').click(function (event) {
        let name = $('#nombre').val();
        let apellido = $('#apellido').val();
        let contraseña = $('#contra').val();
        let correo = $('#email').val();
        
        if(name=="" || apellido==""||contraseña==""||correo==""){
            event.preventDefault();
            alert("Complete todos los datos no debe haber campos vacios");
        }else{
          if(/^([0-9])*$/.test(name)===false){
            if(/^([0-9])*$/.test(apellido)===false){
                if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correo)==false){
                    event.preventDefault();
                    alert("El correo no es correcto");
                        
                }else{
                    alert("Datos Ingresados Correctamente");
                }
            
            }else{
                event.preventDefault();
                alert("no se aceptan numeros en el campo apellido");
            }
           }else{
            event.preventDefault();
            alert("no se aceptan numeros en el campo nombre");
           }
        }
    });
    
});