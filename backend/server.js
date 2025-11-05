// server.js
const dotenv = require('dotenv');
// تنظیمات env
dotenv.config();

const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');



// ایجاد اپلیکیشن Express
const app = express();

// Middlewareها
app.use(cors());
app.use(express.json());

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
