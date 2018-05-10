const db = require('../database/Connection');

const controllers = {};

controllers.listarcuenta = (req, res) => {
  const { nom, apelli, roles } = req.session;
  db.query('select NumeroCuenta from cuenta;', (err, result) => {
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
};
controllers.ingresarinsert = (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, contact3,
    numerodocumento, razon, cuenta, comprobante,
  } = req.body;

  const { ides } = req.session;

  const fecha = new Date();
  db.query(
    'insert into ingresos (titulo,descripcion,tipo,tipo_moneda,monto,tipo_documento,numero_documento,razonSocial,id,cuenta_destino,tipo_componente,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, contact1,
      contact2, moneda, contact3,
      numerodocumento, razon, ides, cuenta, comprobante, fecha, fecha], () => {
      res.status(200).send({ message: 'Registro completo' });
    },
  );
};

controllers.eliminar = (req, res) => {
  const valor = req.params.idingreso;
  db.query('delete from ingresos where idingreso= ?', [valor], () => {
    res.redirect('/tablaingresos');
  });
};

controllers.ingresosEditActualizar = (req, res) => {
  const { session } = req;
  const actualizar = req.params.idingreso;
  db.query('select titulo,descripcion,tipo,tipo_moneda,monto,numero_documento,razonSocial from ingresos where idingreso=?', [actualizar], (err, result) => {
    session.actualizar = actualizar;
    db.query('select NumeroCuenta from cuenta;', (error, results) => {
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
  console.log(actualizar);
  db.query(
    'update ingresos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,tipo_documento=?,numero_documento=?,razonSocial=?,cuenta_destino=?,tipo_componente=?,fecha_actualizacion=? where idingreso=?',
    [titulo, descripcion, contact1, contact2, monto, contact3,
      numerodocumento, razonSocial, cuenta, comprobante, fecha, actualizar], (error) => {
      if (error) {
        res.json(error);
      }
      res.status(200).send({ message: 'Actualizacion completa' });
    },
  );
};
module.exports = controllers;
