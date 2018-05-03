const express=require('express');
const router =express.Router();
const cuscontroler=require('../controllers/controllerUser');
const loginController = require('../controllers/controllerlogin');

router.get('/login', (req, res, next) => { res.render('login');});
router.get('/', (req, res, next) => { res.render('login');});
router.get('/usuarioedit', (req, res, next) => { res.render('usuarioedit');});
router.post('/login', loginController.validarUsuario);
router.get('/tablausuarios/',cuscontroler.tablauser);
router.post('/tablausuarios/',cuscontroler.tablainsert);
router.get('/delete/:id',cuscontroler.delete);
router.get('/update/:id',cuscontroler.consultaedit);
router.post('/update/:id',cuscontroler.refrescar);




module.exports=router;