
const db = require('../database/Connection');

const controllers = {};

controllers.listarcuenta = (req, res) => {

    db.query('select NumeroCuenta from cuenta;', (err, result) => {
      if (err) {
        res.json(err);
       
      }
      res.render('tablaingresos', { listacuenta: result });
      console.log('tabla de ingresos...');
    });
   
};


controllers.ingresoinsert = (req, res) => {
  console.log('no sale');
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const tipoingreso = req.body.contact1;
  const tipomoneda = req.body.contact2;
  const moneda = req.body.moneda;
  const tipodedocumento= req.body.contact3;
  const numero = req.body.numerodocumento;
  const razon = req.body.razon;
  const cuenta = req.body.cuenta;
  const comprobante = req.body.comprobante;
  console.log('no sale');
 db.query(('insert into ingresos (titulo,descripcion,tipo,tipo_moneda,fecha,monto,tipo_documento,numero_documento,razonSocial,cuenta_destino,tipo_componente) values(?,?,?,?,?,?,?,?,?,?,?)',
  [titulo,descripcion,tipoingreso,tipomoneda,moneda,tipomoneda,moneda,tipodedocumento,numero,razon,cuenta,comprobante], () => {
     res.status(200).send({ message: 'Registro completo' });
    }));

};
module.exports = controllers;
