const db = require('../database/connection');
const mysql = require('mysql2/promise');

const controllers = {};

controllers.listarcuenta =  async (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    const connection = await mysql.createConnection(db);
     const [result] =  await connection.query('select * from ingresos;');
        res.render('ingresos/listar', {
          listaingresos: result,
          nom,
          apelli,
          roles,
        });
  } else {
    res.redirect('/login');
  }
};

controllers.crear =  async (req, res) => {
  const {
    nom, apelli, roles, email,
  } = req.session;
  if (email) {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.query('select numero_cuenta from cuentas;');
     const [results] = await connection.query('select * from ingresos;');
       
        res.render('ingresos/crear', {
          listacuenta: result,
          listaingresos: results,
          nom,
          apelli,
          roles,
        });
  } else {
    res.redirect('/login');
  }
};

controllers.crearPost = async (req, res) => {
  const {
    titulo, descripcion, contact1, contact2, moneda, contact3,
    numerodocumento, razon, cuenta, comprobante,
  } = req.body;

  const { ides, nom, apelli } = req.session;

  const fecha = new Date();
  const connection = await mysql.createConnection(db);
  const [result] = await connection.query(
    'insert into ingresos (titulo,descripcion,tipo,tipo_moneda,monto,tipo_documento,numero_documento,razonsocial,autor_id,autor,cuenta_destino,tipo_componente,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, contact1,
      contact2, moneda, contact3,
      numerodocumento, razon, ides, `${nom}  ${apelli}`, cuenta, comprobante, fecha, fecha]);
      if(result){
         res.status(200).send({ message: 'Registro completo' });
      }

};

controllers.eliminar = async (req, res) => {
  const valor = req.params.id;

  const connection = await mysql.createConnection(db);
  const [result]= await connection.query('delete from ingresos where id= ?', [valor]);
     res.redirect('/ingresos');
};


controllers.ingresosEditActualizar = async (req, res) => {
  const { session } = req;
  const actualizar = req.params.id;
  const connection = await mysql.createConnection(db);

  const [result] = await connection.query('select titulo,descripcion,tipo,tipo_moneda,monto,numero_documento,tipo_documento,razonsocial,cuenta_destino,tipo_componente from ingresos where id=?', [actualizar]);
    session.actualizar = actualizar;
  const [results] = await connection.query('select numero_cuenta from cuentas;');
      res.render('ingresos/editar', { datoingreso: result, editlista: results });

};

controllers.ingresosActualizar = async (req, res) => {
  const {
    titulo, descripcion,
    contact1, contact2, monto, contact3, numerodocumento, razonSocial, cuenta, comprobante,
  } = req.body;
  const { actualizar } = req.session;
  const fecha = new Date();
  console.log(contact3);
  const connection = await mysql.createConnection(db);

  const [result] = await connection.query(
    'update ingresos set titulo=?,descripcion=?,tipo=?,tipo_moneda=?,monto=?,tipo_documento=?,numero_documento=?,razonsocial=?,cuenta_destino=?,tipo_componente=?,fecha_actualizacion=? where id=?',
    [titulo, descripcion, contact1, contact2, monto, contact3,
      numerodocumento, razonSocial, cuenta, comprobante, fecha, actualizar]);
        res.status(200).send({ message: 'Actualizacion completa' });
};
module.exports = controllers;
