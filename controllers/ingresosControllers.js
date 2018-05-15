const db = require('../database/Connection');

const controllers = {};

controllers.listarcuenta = (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    db.query('select numero_cuenta from cuentas;', (err, result) => {
      if (err) {
        res.json(err);
      }
      db.query('select * from ingresos;', (error, results) => {
        if (error) {
          res.json(error);
        }
        res.render('tablaingresos', {
          listacuenta: result,
          listaingresos: results,
          nom,
          apelli,
          roles,
        });
      });
    });
  } else {
    res.redirect('/login');
  }
};

controllers.ingresarinsert = (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, contact3,
    numerodocumento, razon, cuenta, comprobante,
  } = req.body;

  const { ides, nom, apelli } = req.session;

  const fecha = new Date();
  db.query(
    'insert into ingresos (titulo,descripcion,tipo,tipo_moneda,monto,tipo_documento,numero_documento,razonsocial,autor_id,autor,cuenta_destino,tipo_componente,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, contact1,
      contact2, moneda, contact3,
      numerodocumento, razon, ides, `${nom}  ${apelli}`, cuenta, comprobante, fecha, fecha], (err) => {
      if (err) {
        console.log(`--> err: ${err}`);
      }
      res.status(200).send({ message: 'Registro completo' });
    },
  );
};

controllers.eliminar = (req, res) => {
  const valor = req.params.id;
  db.query('delete from ingresos where id= ?', [valor], () => {
    res.redirect('/tablaingresos');
  });
};


controllers.ingresosEditActualizar = (req, res) => {
  const { session } = req;
  const actualizar = req.params.id;
  db.query('select titulo,descripcion,tipo,tipo_moneda,monto,numero_documento,tipo_documento,razonsocial,cuenta_destino,tipo_componente from ingresos where id=?', [actualizar], (err, result) => {
    session.actualizar = actualizar;
    db.query('select numero_cuenta from cuentas;', (error, results) => {
      res.render('ingresoedit', { datoingreso: result, editlista: results });
    });
  });
};

controllers.ingresosActualizar = (req, res) => {
  const {
    titulo, descripcion,
    contact1, contact2, monto, contact3, numerodocumento, razonSocial, cuenta, comprobante,
  } = req.body;
  const { actualizar } = req.session;
  const fecha = new Date();
  console.log(contact3);
  db.query(
    'update ingresos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,tipo_documento=?,numero_documento=?,razonsocial=?,cuenta_destino=?,tipo_componente=?,fecha_actualizacion=? where id=?',
    [titulo, descripcion, contact1, contact2, monto, contact3,
      numerodocumento, razonSocial, cuenta, comprobante, fecha, actualizar], (error) => {
      if (error) {
        console.log(error);
      }
      res.status(200).send({ message: 'Actualizacion completa' });
    },
  );
};
module.exports = controllers;
