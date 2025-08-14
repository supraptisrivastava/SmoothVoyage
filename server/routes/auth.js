
const express = require('express');
const router = express.Router();
const { handleAuth0Login } = require('../controllers/authController');

router.post('/login', handleAuth0Login);

module.exports = router;
