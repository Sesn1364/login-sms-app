import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          phone: mobile,
          password,
        },
        {
          withCredentials: true, // 🔥 مهم: دریافت کوکی HttpOnly
        }
      );

      if (response.status === 200) {
        setMessage("✅ ورود موفقیت‌آمیز بود!");
        navigate("/dashboard"); // بدون ذخیره توکن
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ ورود ناموفق. لطفاً اطلاعات را بررسی کنید.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="نام کاربری (شماره موبایل)"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-green-600"
      />

      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-green-600"
      />

      <div className="flex items-center gap-2">
        <img
          src="/captcha-example.png"
          alt="captcha"
          className="h-10 border rounded"
        />
        <input
          type="text"
          placeholder="کد داخل تصویر را وارد کنید"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-green-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        ورود
      </button>

      {message && (
        <p
          className={`text-center mt-2 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
