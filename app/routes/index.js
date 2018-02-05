const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");

router.get('/', auth.home);

router.get('/signup', auth.signup);

router.post('/signup', auth.postSignup);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

module.exports = router;
