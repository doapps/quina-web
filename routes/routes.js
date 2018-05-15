const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const ingresosControllers = require('../controllers/ingresosControllers');
const gastosControllers = require('../controllers/gastosController');

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
router.get('/eliminar/:id', ingresosControllers.eliminar);
router.get('/actualizar/:id', ingresosControllers.ingresosEditActualizar);
router.post('/actualizar', ingresosControllers.ingresosActualizar);


// tabla gastos
router.get('/tablagastos', gastosControllers.listargastos);
router.post('/tablagastos', gastosControllers.gastosinsert);
router.get('/eliminargastos/:id', gastosControllers.gastoseliminar);
router.get('/actualizargastos/:id', gastosControllers.gastosactualizar);
router.post('/actualizargastos', gastosControllers.gastosUpdate);


module.exports = router;
