const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // انتظار داریم توکن به شکل "Bearer <token>" باشه
  const token = authHeader.split(" ")[1];

  try {
    // بررسی اعتبار و تاریخ انقضای توکن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // اطلاعات کاربر رو ذخیره می‌کنیم تا در ادامه قابل دسترسی باشه
    next(); // برو به مرحله بعد
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
