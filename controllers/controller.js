const db = require('../database/Connection');
const controller={};

controller.login = (req,res)=>{
    db.query('select id,correo,contraseña from usuario', (err, result, fields) => {
        console.log(result);
        
        res.render("login",{
        user: result
    });
     
});
   

};



controller.tablauser=(req,res)=>{
    res.render("tablausuarios");
    console.log("tabla de usuarios...");
}


module.exports=controller;