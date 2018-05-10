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
// const { session } = req;
  const {
    titulo, descripcion, tipoingreso, tipomoneda, moneda, tipodedocumento,
    numero, razon, cuenta, comprobante, local,
  } = req.body;
  const fecha = new Date();
  console.log(tipomoneda);
  console.log(tipodedocumento);
  db.query(
    'insert into ingresos (titulo,descripcion,tipo,tipo_moneda,monto,tipo_documento,numero_documento,razonSocial,id,cuenta_destino,tipo_componente,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, tipoingreso, tipomoneda, moneda, tipodedocumento,
      numero, razon, local, cuenta, comprobante, fecha, fecha], () => {
      res.status(200).send({ message: 'Registro completo' });
      // console.log(`este es id ${local}`);
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
  session.actualizar = actualizar;
  db.query('select titulo,descripcion,tipo,tipo_moneda,monto,numero_documento,razonSocial from ingresos where idingreso=?', [actualizar], (err, result) => {
    db.query('select NumeroCuenta from cuenta;', (error, results) => {
      res.render('ingresoedit', { datoingreso: result, editlista: results });
    });
  });
};

controllers.ingresosActualizar = (req, res) => {
  const {
    titulo, descripcion,
    tipoingreso, tipomoneda, moneda, tipodedocumento, numero, razon, cuenta, comprobante,
  } = req.body;
  const { actualizar } = req.session;
  const fecha = new Date();
  console.log(actualizar);
  db.query(
    'update ingresos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,tipo_documento=?,numero_documento=?,razonSocial=?,cuenta_destino=?,tipo_componente=?,fecha_actualizacion=? where idingreso=?',
    [titulo, descripcion, tipoingreso, tipomoneda, moneda,
      tipodedocumento, numero, razon, cuenta, comprobante, fecha, actualizar], () => {
      res.redirect('/tablaingresos');
    },
  );
};
module.exports = controllers;
