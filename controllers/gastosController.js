const db = require('../database/Connection');

const controllers = {};


controllers.listargastos = (req, res) => {
    const { nom, apelli, roles } = req.session;
    db.query('select NumeroCuenta,titular from cuenta;', (err, result) => {
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
  };

  
controllers.gastosinsert = (req, res) => {
    const {
      titulo, descripcion, contact1, contact2, moneda, modalidad,
      contact3, titular, numeroCuenta,
    } = req.body;
  
    const { ides } = req.session;
  
    const fecha = new Date();
    db.query(
      'insert into gastos (titulo,descripcion,tipo,tipo_moneda,monto,modalidad,comprobante,titular,numero_cuenta,id,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?)',
      [  titulo, descripcion, contact1, contact2, moneda, modalidad,
        contact3, titular, numeroCuenta,ides, fecha, fecha], () => {
        res.status(200).send({ message: 'Registro completo' });
      },
    );
  };

  controllers.gastoseliminar = (req, res) => {
    const valor = req.params.idgastos;
    db.query('delete from gastos where idgastos= ?', [valor], () => {
      res.redirect('/tablagastos');
    });
  };

  
controllers.gastosactualizar = (req, res) => {
    const { session } = req;
    const actualizargastos = req.params.idgastos;
    db.query('select titulo,descripcion,monto from gastos where idgastos=?', [actualizargastos], (err, result) => {
      session.actualizargastos  = actualizargastos;
      db.query('select NumeroCuenta,titular from cuenta;', (error, results) => {
        res.render('gastosedit', { datogastos: result, editlista: results });
      });
    });
  };

  
controllers.gastosUpdate = (req, res) => {
    const {
        titulo, descripcion, contact1, contact2, moneda, modalidad,
        contact3, titular, numeroCuenta,
    } = req.body;
    const { actualizargastos  } = req.session;
    const fecha = new Date();
    db.query(
      'update gastos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,modalidad=?,comprobante=?,titular=?,numero_cuenta=?,fecha_actualizacion=? where idgastos=?',
      [titulo, descripcion, contact1, contact2, moneda, modalidad,
        contact3, titular, numeroCuenta, fecha, actualizargastos ], (error) => {
        if (error) {
          res.json(error);
        }
        res.status(200).send({ message: 'Actualizacion completa' });
      },
    );
  };
  
module.exports = controllers;