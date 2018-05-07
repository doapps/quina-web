const db = require('../database/Connection');
const crypto = require('crypto');

const user = {};

user.validarUsuario = (req, res) => {
  const { session } = req;
  const { email } = req.body;
  const passwords = req.body.password;
  const encryptPassword = crypto.createHash('md5').update(passwords).digest('hex');

  db.query('select correo,contra from usuario where correo=? and contra=?', [email, encryptPassword], (err, result) => {
    let vercorreo = false;
    let vercontra = false;
    if (result.length === 0) {
      vercorreo = false;
      vercontra = false;
    } else {
      const rcor = result[0].correo === email;
      const rcon = result[0].contra === encryptPassword;
      if (rcor === true) {
        vercorreo = true;
        if (rcon === true) {
          vercontra = true;
          session.email = email;
        }
      }
    }
    res.render('login', { vercorreo, vercontra });
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
