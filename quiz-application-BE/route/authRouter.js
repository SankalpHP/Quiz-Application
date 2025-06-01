// imports
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// routes for auth controller
router.post('/register',authController.registerUser);
router.post('/login',authController.LoginUser);
router.get('/:id',authController.getuser);
router.post('/registerUpdate',authController.updateRegisterUser);
router.post('/users',authController.getAlluser);
router.post('/username',authController.getUserName);
module.exports = router;