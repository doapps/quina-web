const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

router.get('/login', (req, res, next) => { res.render('login'); });
router.get('/', (req, res, next) => { res.render('login'); });
router.get('/usuarioedit', (req, res, next) => { res.render('usuarioedit'); });
router.post('/login', loginController.validarUsuario);
router.get('/tablausuarios/',userController.tablauser);
router.post('/tablausuarios/',userController.tablainsert);
router.get('/delete/:id', userController.delete);
router.get('/update/:id', userController.consultaedit);
router.post('/update/:id', userController.refrescar);

module.exports=router;