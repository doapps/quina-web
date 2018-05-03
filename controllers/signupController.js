const db = require('../database/Connection');
const user = {};

user.validarUsuario = (req, res) => {
    res.status(200).send({ message: 'Operación exitosa0' });
    // res.render("login", { "vercorreo": vercorreo, "vercontra": vercontra });
};

module.exports = user;