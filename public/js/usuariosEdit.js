$(document).ready(() => {
  $('#editarUsuarios').on('submit', (event) => {
    let name = $('#nombre').val();
    let apellido = $('#apellido').val();
    let correo = $('#email').val();

       event.preventDefault();
      if (/^([0-9])*$/.test(name) === false) {
             if (/^([0-9])*$/.test(apellido) === false) {
                    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correo) === false) {
                                alert("El correo no es correcto");
                    } else {
                        actualizarUsuarios(($('#editarUsuarios').serialize()));
                        location.reload();
                    }
            } else {
               alert('no se aceptan numeros en el campo apellido');
            }
      } else {
        alert('no se aceptan numeros en el campo nombre');
        
    }

  });

  function actualizarUsuarios(formData) {
    $.ajax({
      type: 'POST',
      url: '/actualizarUsuario',
      data: formData,
      success: (data) => {
        alert(data.message);
        window.location.href ="/tablausuarios";
      },
      error: (jqXHR, textStatus, err) => {
        alert('text status ' + textStatus + ', err ' + err);
      }
    });
  }

});