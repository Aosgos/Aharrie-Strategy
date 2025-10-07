const express = require('express');

const authCont = require('../controllers/authCont');

const router = express.Router();

router.post('/create-account', authCont.createAccount);
router.post('/login', authCont.login);

module.exports = router;