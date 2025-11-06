import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[900px]">
        
        {/* سمت چپ: تصویر */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img
            src="/login-illustration.png" // بعداً تصویر واقعی رو جایگزین کن
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* سمت راست: فرم لاگین */}
        <div className="w-1/2 p-10 text-right">
          <img
            src="/mobiinnet-logo.png" // لوگوی مبین‌نت
            alt="Mobiinnet Logo"
            className="w-40 mx-auto mb-6"
          />

          <h2 className="text-xl font-semibold text-center mb-6">
            سامانه پیامکی مبین‌نت
          </h2>

          {/* تب‌ها */}
          <div className="flex justify-center mb-6 border-b">
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-2 font-medium ${
                activeTab === "login"
                  ? "border-b-2 border-green-600 text-green-700"
                  : "text-gray-400"
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setActiveTab("forgot")}
              className={`w-1/2 py-2 font-medium ${
                activeTab === "forgot"
                  ? "border-b-2 border-green-600 text-green-700"
                  : "text-gray-400"
              }`}
            >
              بازیابی رمز عبور
            </button>
          </div>

          {/* فرم‌ها */}
          {activeTab === "login" ? <LoginForm /> : <ForgotPasswordForm />}
        </div>
      </div>
    </div>
  );
}
