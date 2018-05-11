const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const ingresosControllers = require('../controllers/ingresosControllers');

router.get('/', loginController.validarSession);
router.get('/login', loginController.validarSession);
router.post('/login', loginController.validarUsuario);
router.get('/logout', loginController.logout);

router.get('/usuarioedit', (req, res) => { res.render('usuarioedit'); });
router.get('/tablausuarios', userController.tablauser);
router.post('/tablausuarios', userController.tablainsert);
router.get('/delete/:id', userController.delete);
router.get('/update/:id', userController.consultaedit);
router.post('/actualizarUsuario', userController.refrescar);

// tabla ingresos
router.get('/tablaingresos', ingresosControllers.listarcuenta);
router.post('/tablaingresos', ingresosControllers.ingresarinsert);
router.get('/eliminar/:idingreso', ingresosControllers.eliminar);
router.get('/actualizar/:idingreso', ingresosControllers.ingresosEditActualizar);
router.post('/actualizar', ingresosControllers.ingresosActualizar);

module.exports = router;
