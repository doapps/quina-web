const db = require('../database/Connection');
const user={};

user.validarUsuario = (req, res) => {
    let session = req.session;
    const email = req.body.email;
    const passwords = req.body.password;
    const encryptPassword = require('crypto').createHash('md5').update(passwords).digest('hex');

    db.query('select correo,contra from usuario where correo=? and contra=?',[email,encryptPassword], function (err, result, fields){
        var vercorreo = false;
        var vercontra = false;
        if (result.length == 0) {
            vercorreo = false;
             vercontra = false;
        } else{
            var rcor = result[0].correo == email;
            var rcon = result[0].contra == encryptPassword;
            if(rcor==true){
                vercorreo=true;
                if(rcon==true){
                    vercontra=true;
                    session.email = email;
                }
            }
        }
      res.render("login",{"vercorreo":vercorreo,"vercontra":vercontra});
    });
};

user.logout = (req, res) => {
    let session = req.session;
    session.destroy();
    res.redirect('/login');
};

user.validarSession = (req, res) => {
    let session = req.session;
    if (session.email) {
        res.redirect('/tablausuarios');
    } else {
        res.render('login');
    }
};
   
module.exports=user;