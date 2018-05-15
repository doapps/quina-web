const db = require('../database/Connection');

const controllers = {};


controllers.listargastos = (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    db.query('select numero_cuenta,titular from cuentas;', (err, result) => {
      if (err) {
        res.json(err);
      }
      db.query('select * from gastos;', (error, results) => {
        if (error) {
          res.json(error);
        }
        res.render('tablagastos', {
          listacuenta: result,
          listagastos: results,
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

controllers.gastosinsert = (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, modalidad,
    contact3, titular, numeroCuenta,
  } = req.body;
  const { ides, nom, apelli } = req.session;
  const fecha = new Date();
  db.query(
    'insert into gastos (titulo,descripcion,tipo,tipo_moneda,monto,modalidad,comprobante,titular,numero_cuenta,autor_id,autor,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, contact1, contact2, moneda, modalidad,
      contact3, titular, numeroCuenta, ides, `${nom}  ${apelli}`, fecha, fecha], () => {
      res.status(200).send({ message: 'Registro completo' });
    },
  );
};

controllers.gastoseliminar = (req, res) => {
  const valor = req.params.id;
  db.query('delete from gastos where id=?', [valor], () => {
    res.redirect('/tablagastos');
  });
};

controllers.gastosactualizar = (req, res) => {
  const { session } = req;
  const actualizargastos = req.params.id;
  db.query('select titulo,descripcion,tipo,tipo_moneda,modalidad,comprobante,titular,numero_cuenta,monto from gastos where id=?', [actualizargastos], (err, result) => {
    session.actualizargastos = actualizargastos;
    db.query('select numero_cuenta,titular from cuentas;', (error, results) => {
      res.render('gastosedit', { datogastos: result, editlista: results });
    });
  });
};

controllers.gastosUpdate = (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, modalidad,
    contact3, titular, numeroCuenta,
  } = req.body;
  const { actualizargastos } = req.session;
  const fecha = new Date();
  db.query(
    'update gastos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,modalidad=?,comprobante=?,titular=?,numero_cuenta=?,fecha_actualizacion=? where id=?',
    [titulo, descripcion, contact1, contact2, moneda, modalidad,
      contact3, titular, numeroCuenta, fecha, actualizargastos,
    ], (error) => {
      if (error) {
        res.json(error);
      }
      res.status(200).send({ message: 'Actualizacion completa' });
    },
  );
};

module.exports = controllers;
