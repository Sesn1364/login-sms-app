// routes/captchaRoutes.js
const express = require('express');
const { getCaptcha } = require('../controllers/captchaController');

const router = express.Router();

router.get('/', getCaptcha); // GET /api/captcha

module.exports = router;
