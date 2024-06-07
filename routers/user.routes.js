// user.routes
const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controllers');
const { validateRegisterData, validateLoginData } = require('../middleware/validation/user-validation'); //Export validasi registrasi dan login

const router = express.Router();

//Route untuk registrasi user
router.post('/register', validateRegisterData, registerUser); 

//Route untuk login user
router.post('/login', validateLoginData, loginUser);

module.exports = router;

