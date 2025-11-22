// controllers/captchaController.js
const svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');

// ساده‌ترین ذخیره‌سازی برای لوکال (برای production از Redis استفاده کنید)
const captchaStore = new Map(); // captchaId -> { text, expiresAt }

const CAPTCHA_TTL_MS = 2 * 60 * 1000; // 2 دقیقه (قابل تغییر)

function cleanUpExpiredCaptchas() {
  const now = Date.now();
  for (const [id, value] of captchaStore.entries()) {
    if (value.expiresAt <= now) captchaStore.delete(id);
  }
}
// هر چند ثانیه یک‌بار پاکسازی انجام می‌شود
setInterval(cleanUpExpiredCaptchas, 60 * 1000);

exports.getCaptcha = (req, res) => {
  // تولید کپچا: حروف + اعداد، نویز و خطوط
  const captcha = svgCaptcha.create({
    size: 5, // تعداد کاراکترها
    noise: 1,
    ignoreChars: '0oO1ilI', // حذف کاراکترهای گیج‌کننده (اختیاری)
    color: true,
    width: 150,
    height: 50,
    fontSize: 80, // پررنگ‌تر و بزرگ‌تر
    charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  });

  const captchaId = uuidv4();
  const text = captcha.text; // متن واقعی کپچا

  // ذخیره در Map با زمان انقضا
  captchaStore.set(captchaId, {
    text,
    expiresAt: Date.now() + CAPTCHA_TTL_MS
  });

  // ارسال svg به صورت data URI برای نمایش ساده در فرانت
  const svgData = 'data:image/svg+xml;utf8,' + encodeURIComponent(captcha.data);

  res.json({
    captchaId,
    svg: svgData,
    expiresIn: CAPTCHA_TTL_MS // میلی‌ثانیه (اختیاری)
  });
};

// تابع کمکی برای middleware یا چک مستقیم
exports.verifyCaptchaOnServer = (captchaId, userInput) => {
  if (!captchaId || !userInput) return false;

  const entry = captchaStore.get(captchaId);
  if (!entry) return false;

  if (entry.expiresAt <= Date.now()) {
    captchaStore.delete(captchaId);
    return false;
  }

  // می‌توانیم مقایسه را به صورت case-insensitive انجام دهیم
  const isValid = entry.text.toLowerCase() === String(userInput).trim().toLowerCase();

  // پس از یک بار استفاده، بهتر است حذف شود تا دوباره استفاده نشود
  if (isValid) captchaStore.delete(captchaId);

  return isValid;
};
