const db = require('../database/Connection');
const crypto = require('crypto');

const user = {};

user.validarUsuario = (req, res) => {
  const { session } = req;
  const { email } = req.body;
  const passwords = req.body.password;
  const encryptPassword = crypto.createHash('md5').update(passwords).digest('hex');
  db.query('select correo,contra,rol,nombre,apellido,id from usuarios where correo=? and contra=?', [email, encryptPassword], (err, result) => {
    let mensaje = '';
    if (result.length === 0) {
      mensaje = 'Datos Incorrectos';
    } else {
      const rcor = result[0].correo === email;
      const rcon = result[0].contra === encryptPassword;
      if (rcor === true && rcon === true) {
        const nom = result[0].nombre;
        const apelli = result[0].apellido;
        const roles = result[0].rol;
        const ides = result[0].id;
        mensaje = 'Datos Ingresados correctamente';
        session.email = email;
        session.nom = nom;
        session.ides = ides;
        session.apelli = apelli;
        session.roles = roles;
      }
    }
    const { roles } = req.session;
    res.status(200).send({ message: mensaje, email, roles });
  });
};

user.logout = (req, res) => {
  const { session } = req;
  session.destroy();
  res.redirect('/login');
};

user.validarSession = (req, res) => {
  const { session } = req;
  const { roles } = req.session;
  console.log(roles);
  if (session.email) {
    res.redirect('/tablausuarios');
  } else {
    res.render('login');
  }
};
module.exports = user;
