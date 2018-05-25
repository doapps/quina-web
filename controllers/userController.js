const db = require('../database/connection');
const crypto = require('crypto');

const controller = {};

controller.listar = (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    if (roles === 'Administrador') {
      db.query('select * from  usuarios ', (err, result) => {
        if (err) {
          res.json(err);
        }
        res.render('usuarios/listar', {
          tablau: result,
          nom,
          apelli,
          roles,
        });
        console.log('tabla de usuarios...');
      });
    } else {
      res.redirect('/tablaingresos');
    }
  } else {
    res.redirect('/login');
  }
};

controller.crear = (req, res) => {
  const {
    roles, email,
  } = req.session;
  if (email) {
    if (roles === 'Administrador') {
      res.render('usuarios/crear', {});
    } else {
      res.redirect('/tablaingresos');
    }
  } else {
    res.redirect('/login');
  }
};

controller.crearPost = (req, res) => {
  const nombre = req.body.name;
  const apellido = req.body.lastname;
  const contra = req.body.contraseña;
  const correos = req.body.correo;
  const roles = req.body.rol;
  const encrypt = crypto.createHash('md5').update(contra).digest('hex');
  db.query('select * from usuarios where correo = ?', correos, (err, result) => {
    if (result.length > 0) {
      res.status(200).send({ message: 'El correo ya existe' });
    } else {
      const fecha = new Date();
      const fecha2 = new Date();
      const habilitar = 'Habilitado';
      db.query(
        'insert into  usuarios (nombre,apellido,correo,contra,rol,estado,fecha_creacion,fecha_actualizacion)values(?,?,?,?,?,?,?,?)',
        [nombre, apellido, correos, encrypt, roles, habilitar, fecha, fecha2], () => {
          res.status(200).send({ message: 'Registro completo' });
        },
      );
    }
  });
};

controller.eliminar = (req, res) => {
  const { ides } = req.session;
  const valor = req.params.id;
  console.log(ides);
  console.log(valor);
  if (ides === valor) {
    db.query('delete from gastos where autor_id=?', valor, () => {
      db.query('delete from ingresos where autor_id=?', valor, () => {
        db.query('delete from usuarios where id=?', valor, () => {
          res.redirect('/logout');
        });
      });
    });
  } else {
    db.query('delete from gastos where autor_id=?', valor, () => {
      db.query('delete from ingresos where autor_id=?', valor, () => {
        db.query('delete from usuarios where id=?', valor, () => {
          res.redirect('/usuarios');
        });
      });
    });
  }
};

controller.editar = (req, res) => {
  const { session } = req;
  const actualizaUsuario = req.params.id;
  session.actualizaUsuario = actualizaUsuario;
  db.query('select id,nombre,apellido,correo,rol,estado  from usuarios where id=?', [actualizaUsuario], (err, result) => {
    res.render('usuarios/editar', { dato: result });
  });
};

controller.editarPost = (req, res) => {
  const { actualizaUsuario } = req.session;
  const nom = req.body.nombre;
  const apelli = req.body.apellido;
  const email = req.body.correo;
  const rul = req.body.rol;
  const estatus = req.body.estado;
  const fecha = new Date();
  db.query('update usuarios set nombre=?,apellido=?,correo=?,rol=?,estado=?,fecha_actualizacion=? where id=?', [nom, apelli, email, rul, estatus, fecha, actualizaUsuario], () => {
    res.status(200).send({ message: 'Acción con exito' });
  });
};

module.exports = controller;
