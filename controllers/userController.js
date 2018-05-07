const db = require('../database/Connection');
const crypto = require('crypto');

const controller = {};

controller.tablauser = (req, res) => {
  const { session } = req;
  if (session.email) {
    db.query('select * from  usuario ', (err, result) => {
      if (err) {
        res.json(err);
      }
      res.render('tablausuarios', { tablau: result });
      console.log('tabla de usuarios...');
    });
  } else {
    res.redirect('/login');
  }
};


controller.tablainsert = (req, res) => {
  const nombre = req.body.name;
  const apellido = req.body.lastname;
  const contra = req.body.contraseña;
  const correos = req.body.correo;
  const roles = req.body.rol;
  const encrypt = crypto.createHash('md5').update(contra).digest('hex');
  db.query('select * from usuario where correo = ?', correos, (err, result) => {
    if (result.length > 0) {
      res.status(200).send({ message: 'El correo ya existe' });
    } else {
      const fecha = new Date();
      const sql = 'INSERT INTO usuario SET ?';
      const values = {
        'nombre': nombre, 
        'apellido': apellido, 
        'correo': correos, 
        'contra': encrypt, 
        'rol': roles, 
        'estado': 'Habilitado', 
        'fecha_creacion': fecha, 
        'fecha_actualizacion': fecha
      };
      db.query(sql, values, (err, result) => {
        if (err) {
          res.status(200).send({ message: 'Ocurio un error' });
        } else {
          res.status(200).send({ message: 'Registro completo' });
        }
      });
    }
  });
};

controller.delete = (req, res) => {
  const valor = req.params.id;
  db.query('delete from usuario where id= ?', [valor], () => {
    res.redirect('/tablausuarios');
  });
};


controller.consultaedit = (req, res) => {
  const actualizar = req.params.id;
  db.query('select id,nombre,apellido,correo,rol,estado  from usuario where id=?', [actualizar], (err, result) => {
    res.render('usuarioedit', { dato: result });
  });
};

controller.refrescar = (req, res) => {
  const update = req.params.id;
  const nom = req.body.nombre;
  const apelli = req.body.apellido;
  const email = req.body.correo;
  const rul = req.body.rol;
  const estatus = req.body.estado;
  const fecha = new Date();
  db.query('update usuario set nombre=?,apellido=?,correo=?,rol=?,estado=?,fecha_actualizacion=? where id=?', [nom, apelli, email, rul, estatus, fecha, update], () => {
    res.redirect('/tablausuarios');
  });
};

module.exports = controller;
