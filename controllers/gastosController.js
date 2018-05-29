const db = require('../database/connection');
const mysql = require('mysql2/promise');

const controllers = {};


controllers.listargastos = async (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    const connection = await mysql.createConnection(db);
     const [result] = await connection.query('select * from gastos;');
        res.render('gastos/listar', {
          listagastos: result,
          nom,
          apelli,
          roles,
        });
  } else {
    res.redirect('/login');
  }
};



controllers.crear = async (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.query('select numero_cuenta,titular from cuentas;');
     const [results] =  await connection.query('select * from gastos;');
       res.render('gastos/crear', {
          listacuenta: result,
          listagastos: results,
          nom,
          apelli,
          roles,
        });
  } else {
    res.redirect('/login');
  }
};



controllers.crearPost = async(req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, modalidad,
    contact3, titular, numeroCuenta,
  } = req.body;
  const { ides, nom, apelli } = req.session;
  const fecha = new Date();
  const connection = await mysql.createConnection(db);
 const [result] = await connection.query(
    'insert into gastos (titulo,descripcion,tipo,tipo_moneda,monto,modalidad,comprobante,titular,numero_cuenta,autor_id,autor,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, contact1, contact2, moneda, modalidad,
      contact3, titular, numeroCuenta, ides, `${nom}  ${apelli}`, fecha, fecha]);
        res.status(200).send({ message: 'Registro completo' });

};

controllers.gastoseliminar = async(req, res) => {
  const valor = req.params.id;
  const connection = await mysql.createConnection(db);
  const [result] = await connection.query('delete from gastos where id=?', [valor]);
    res.redirect('/gastos');

};

controllers.gastosactualizar = async (req, res) => {
  const { session } = req;
  const actualizargastos = req.params.id;
  const connection = await mysql.createConnection(db);

    const [result] = await connection.query('select titulo,descripcion,tipo,tipo_moneda,modalidad,comprobante,titular,numero_cuenta,monto from gastos where id=?', [actualizargastos]);
    session.actualizargastos = actualizargastos;
    const [results] = await connection.query('select numero_cuenta,titular from cuentas;');
      res.render('gastos/editar', { datogastos: result, editlista: results });
 
};

controllers.gastosUpdate = async (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, modalidad,
    contact3, titular, numeroCuenta,
  } = req.body;
  const { actualizargastos } = req.session;
  const fecha = new Date();
  const connection = await mysql.createConnection(db);
  const [result]  = await connection.query(
    'update gastos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,modalidad=?,comprobante=?,titular=?,numero_cuenta=?,fecha_actualizacion=? where id=?',
    [titulo, descripcion, contact1, contact2, moneda, modalidad,
      contact3, titular, numeroCuenta, fecha, actualizargastos,
    ]);
      res.status(200).send({ message: 'Actualizacion completa' });
};

module.exports = controllers;
