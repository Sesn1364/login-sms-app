const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyCaptcha = require('../middlewares/verifyCaptcha');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', verifyCaptcha, loginUser);

//مسیر دریافت اطلاعات کامل کاربر
router.get('/me', authMiddleware, getMe);

module.exports = router;
