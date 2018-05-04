const db = require('../database/Connection');
const controller={};

controller.tablauser=(req,res)=>{
    db.query('select * from  usuario ', function (err, result, fields){
        if (err) {
            res.json(err);
           }
            res.render("tablausuarios",{tablau:result});
            console.log("tabla de usuarios...");

    });
}

controller.tablainsert = (req,res) => {
    const nombre = req.body.name;
    const apellido = req.body.lastname;
    const contra = req.body.contraseña;
    const correos = req.body.correo;
    const roles = req.body.rol;
    const encryptcontraseña = require('crypto').createHash('md5').update(contra).digest('hex');
    var mensajecorreo="";
    db.query('select correo from usuario',function(err,result,fields){
        result.forEach(element => {
            if(element.correo==correos){
                mensajecorreo="El correo se repite  porfavor ingrese un correo nuevo";
                res.status(200).send({message: mensajecorreo});
               
            }else{
                res.status(200).send({message: mensajecorreo});
                
            }
        });
    });
        var fecha = new Date();
        db.query('insert into usuario (nombre ,apellido,correo,contra,rol,estado,fecha_creacion,fecha_actualizacion) values(?,?,?,?,?,?,?,?)',
        [nombre,apellido,correos,encryptcontraseña,roles,'Habilitado',fecha,fecha],
        function(err,result,fields){
            console.log(roles);
             res.render("tablausuarios");
            res.redirect("/tablausuarios/");
    });
};



controller.delete= (req, res) => {
    const valor=req.params.id;
    db.query('delete from usuario where id= ?',[valor],function(err,result,fields){
        res.redirect("/tablausuarios/");
     
       
});

}


controller.consultaedit= (req, res) => {
    const actualizar=req.params.id;
    db.query('select id,nombre,apellido,correo,rol,estado  from usuario where id=?',[actualizar],function(err,result,fields){
        
        res.render("usuarioedit",{dato:result});
        
});

}

controller.refrescar=(req,res)=>{
    const update=req.params.id;
    const nom=req.body.nombre;
    const apelli=req.body.apellido;
    const email=req.body.correo;
    const rul=req.body.rol;
    const estatus=req.body.estado;
    var fecha =new Date();
    db.query('update usuario set nombre=?,apellido=?,correo=?,rol=?,estado=?,fecha_actualizacion=? where id=?'
    ,[nom,apelli,email,rul,estatus,fecha,update],function(err,result,fields){
    
        res.redirect("/tablausuarios/");


    });
}

module.exports=controller;