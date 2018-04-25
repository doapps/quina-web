const express=require('express');
const router =express.Router();
const cuscontroler=require('../controllers/controller');

router.get('/',cuscontroler.login);
router.get('/tablausuarios/',cuscontroler.tablauser);

module.exports=router;