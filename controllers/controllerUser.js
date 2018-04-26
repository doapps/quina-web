const db = require('../database/Connection');
const controller={};


controller.tablauser=(req,res)=>{

   
    db.query('select id,nombre,apellido,correo,contra,rol,estado,fecha_creacion,fecha_actualizacion from  usuario ', function (err, result, fields){

    res.render("tablausuarios",{usertabla:result});
    console.log("tabla de usuarios...");

    });
}


controller.tablainsert=(req,res)=>{
    const nombre = req.body.name;
    const apellido = req.body.address;
    const contra=req.body.contraseña;
    const correos=req.body.correo;
    const roles=req.body.rol;
    const estados=req.body.estado;
    const encryptcontraseña = require('crypto').createHash('md5').update(contra).digest('hex');

    db.query('insert into usuario (nombre ,apellido,correo,contra,rol,estado,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?)',
    [nombre,apellido,correos,encryptcontraseña,roles,],
    function(err,result,fields){

    



});




}









module.exports=controller;