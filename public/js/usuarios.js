$(document).ready(() => {
// AJAX Events
  $('#create-form').on('submit', (event) => {
    let name = $('#nombre').val();
    let apellido = $('#apellido').val();
    let contraseña = $('#contra').val();
    let correo = $('#email').val();

    event.preventDefault();
    if (name === '' || apellido === '' || contraseña === '' || correo === '') {
      alert('Complete todos los datos no debe haber campos vacios');
    } else {            
      if (/^([0-9])*$/.test(name) === false) {
           if (/^([0-9])*$/.test(apellido) === false) {
               if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correo) === false) {
                        alert("El correo no es correcto");
                    } else {
                        submitCreateUser($('#create-form').serialize());
                    }
                } else {
                    alert('no se aceptan numeros en el campo apellido');
                }
            } else {
               alert('no se aceptan numeros en el campo nombre');
        }
    }
  });

  $('.user-delete').click((event) => {
    let confi = confirm('Esta seguro que desea eliminar');
    if (confi) {
      alert('Eliminado correctamente');
    } else {
      event.preventDefault();
    }
  });

 // AJAX Functions
  function submitCreateUser(formData) {
    $.ajax({
      type: 'POST',
      url: '/tablausuarios',
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