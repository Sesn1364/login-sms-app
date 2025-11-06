// server.js
const dotenv = require('dotenv');
// تنظیمات env
dotenv.config();

const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');


// ایجاد اپلیکیشن Express
const app = express();

// Middlewareها
app.use(cors());
app.use(express.json());

// مسیرهای احراز هویت
app.use('/api/auth', authRoutes);

// مسیرهای محافظت‌شده کاربران (مثل dashboard)
app.use('/api/users', userRoutes);

// تست ساده برای اطمینان از کارکرد سرور
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

// پورت سرور
const PORT = process.env.PORT || 5000;

// راه‌اندازی سرور
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
