const db = require('../database/Connection');
const crypto = require('crypto');

const user = {};

user.validarUsuario = (req, res) => {
  const { session } = req;
  const { email } = req.body;
  const passwords = req.body.password;
  const encryptPassword = crypto.createHash('md5').update(passwords).digest('hex');
  db.query('select correo,contra,rol,nombre,apellido,id from usuario where correo=? and contra=?', [email, encryptPassword], (err, result) => {
    let mensaje="";
    if (result.length === 0) {
      mensaje="Datos Incorrectos"
      console.log(mensaje);
    } else {
      let rcor = result[0].correo === email;
      let rcon = result[0].contra === encryptPassword;
      console.log(mensaje);
      if (rcor === true && rcon === true) {
            let nom=result[0].nombre;
            let apelli=result[0].apellido;
            let roles=result[0].rol;
            let ides=result[0].id;
            mensaje="Datos Ingresados correctamente"
            session.email = email;
            session.nom = nom;
            session.ides = ides;
            session.apelli = apelli;
            session.roles = roles;

      }
     
    }
     res.status(200).send({ message: mensaje, email});
  });


};

user.logout = (req, res) => {
  const { session } = req;
  session.destroy();
  res.redirect('/login');
};

user.validarSession = (req, res) => {
  const { session } = req;
  if (session.email) {
    res.redirect('/tablausuarios');
  } else {
    res.render('login');
  }
};
module.exports = user;
