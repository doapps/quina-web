const db = require('../database/Connection');

const controllers = {};

controllers.listarcuenta = (req, res) => {
  const { nom, apelli, roles } = req.session;
  db.query('select NumeroCuenta from cuenta;', (err, result) => {
    if (err) {
      res.json(err);
    }
    db.query('select * from ingresos;', (err, results, fields) => {
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
  const { session } = req;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const tipoingreso = req.body.contact1;
  const tipomoneda = req.body.contact2;
  const moneda = req.body.moneda;
  const tipodedocumento = req.body.contact3;
  const numero = req.body.numerodocumento;
  const razon = req.body.razon;
  const cuenta = req.body.cuenta;
  const comprobante = req.body.comprobante;
  const fecha = new Date();
  const local = req.session.ides;
  console.log(tipomoneda);
  console.log(tipodedocumento);
  db.query('insert into ingresos (titulo,descripcion,tipo,tipo_moneda,monto,tipo_documento,numero_documento,razonSocial,id,cuenta_destino,tipo_componente,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [titulo, descripcion, tipoingreso, tipomoneda, moneda, tipodedocumento, numero, razon, local, cuenta, comprobante, fecha, fecha], () => {
      res.status(200).send({ message: 'Registro completo' });
      console.log(local + " este es id");

    });

};

controllers.eliminar = (req, res) => {
  const valor = req.params.idingreso;
  db.query('delete from ingresos where idingreso= ?', [valor], () => {
    res.redirect('/tablaingresos');
  });
};



controllers.editlistar = (req, res) => {
  const { session } = req;
  db.query("select NumeroCuenta from cuenta;", (err, result, fields) => {
    res.render('ingresoedit', { editlista: result });
  });
}
module.exports = controllers;
