import React, { useState } from "react";
import LoginForm from "../components/login-form/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import loginIllustration from "../assets/login/mobile-e.90fccca8dfc3f8f3c4a4.png";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[65%] h-[85vh]">
        
        {/* سمت چپ: تصویر */}
        <div className="w-3/5 bg-black flex items-center justify-center">
          <img
            src={loginIllustration} 
            alt="Login Illustration"
            className="object-contain w-full h-full"
          />
        </div>

        {/* سمت راست: فرم لاگین */}
        <div className="w-2/5 p-10 text-right">
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
