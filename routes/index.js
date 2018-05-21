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

// modulo usuarios
router.get('/usuarios', userController.listar);
router.get('/usuarios/crear', userController.crear);
router.get('/usuarios/editar/:id', userController.editar);
router.post('/usuarios/crear', userController.crearPost);
router.post('/usuarios/editar', userController.editarPost);
router.get('/usuarios/eliminar/:id', userController.eliminar);

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
