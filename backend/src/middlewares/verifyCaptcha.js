// middlewares/verifyCaptcha.js
const { verifyCaptchaOnServer } = require('../controllers/captchaController');

function verifyCaptcha(req, res, next) {
  const { captchaId, captcha } = req.body;

  if (!captchaId || !captcha) {
    return res.status(400).json({ message: 'کپچا ارسال نشده است' });
  }

  const ok = verifyCaptchaOnServer(captchaId, captcha);
  if (!ok) {
    return res.status(400).json({ message: 'کپچا نامعتبر یا منقضی شده است' });
  }

  // کپچا درست است -> ادامه جریان (مثلاً ورود)
  next();
}

module.exports = verifyCaptcha;
