// routes/auth.js
const express = require('express');
const router = express.Router();
const { handleAuth0Login } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', handleAuth0Login);

module.exports = router;
