const db = require('../database/Connection');
const user={};

user.validarUsuario = (req, res) => {
    const email = req.body.email;
    const passwords = req.body.password;
    const encryptPassword = require('crypto').createHash('md5').update(passwords).digest('hex');

   
    db.query('select correo,contra from usuario where correo= ? or contra=? ',[email,encryptPassword], function (err, result, fields){
        var vercorreo=false;
        var vercontra=false;
        
        if(result.length==0) {
            vercorreo=false;
             vercontra=false;
            
        }else{

        var rcor=result[0].correo == email;
        var rcon=result[0].contra == encryptPassword;
    

            if(rcor==true){
                vercorreo=true;
                if(rcon==true){
                vercontra=true;
                }
            }

        }


      
      res.render("login",{"vercorreo":vercorreo,"vercontra":vercontra});
    });
};
   
module.exports=user;