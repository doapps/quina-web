const express=require('express');
const router =express.Router();
const cuscontroler=require('../controllers/controllerUser');
const loginController = require('../controllers/controllerlogin');

router.get('/', (req, res, next) => { res.render('login');});
router.post('/login', loginController.validarUsuario);
router.get('/tablausuarios/',cuscontroler.tablauser);
router.post('/tablausuarios/',cuscontroler.tablainsert);

module.exports=router;