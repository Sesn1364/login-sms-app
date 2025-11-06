const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// 📌 ثبت‌نام کاربر جدید
exports.registerUser = (req, res) => {
  const { username, phone, password } = req.body;

  if (!username || !phone || !password) {
    return res.status(400).json({ message: 'تمام فیلدها الزامی هستند' });
  }

  // بررسی تکراری بودن کاربر
  const checkUserQuery = 'SELECT * FROM users WHERE phone = ? OR username = ?';
  db.query(checkUserQuery, [phone, username], (err, results) => {
    if (err) return res.status(500).json({ message: 'خطای سرور', error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: 'کاربر با این اطلاعات قبلاً ثبت شده است' });
    }

    // هش کردن رمز عبور
    const hashedPassword = bcrypt.hashSync(password, 10);

    // درج در دیتابیس
    const insertQuery = 'INSERT INTO users (username, phone, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, phone, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: 'خطا در ثبت‌نام', error: err });

      res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد' });
    });
  });
};

// 📌 ورود کاربر
exports.loginUser = (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'شماره موبایل و رمز عبور الزامی هستند' });
  }

  const query = 'SELECT * FROM users WHERE phone = ?';
  db.query(query, [phone], (err, results) => {
    if (err) return res.status(500).json({ message: 'خطای سرور', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'کاربری با این شماره پیدا نشد' });
    }

    const user = results[0];

    // مقایسه رمز عبور
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'رمز عبور نادرست است' });
    }

    // ساخت توکن JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );

    res.json({ message: 'ورود موفق', token });
  });
};
