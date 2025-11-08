import React, { useState } from "react";
import LoginForm from "../components/login-form/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import loginIllustration from "../assets/login/mobile-e.90fccca8dfc3f8f3c4a4.png";
import mobinnetTextLogo from "../assets/login/mobinnet-text-logo.png";
import backgroundCircle from "../assets/login/backgroundCircle.4436cbea0770b2738c55377bc7f45006.svg";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-2xl shadow-lg w-[65%] h-[85vh]">
        
        {/* سمت چپ: تصویر */}
        <div className="w-3/5 bg-black flex items-center justify-center rounded-l-2xl">
          <img
            src={loginIllustration} 
            alt="Login Illustration"
            className="object-contain w-full h-full"
          />
        </div>

         {/* سمت راست: فرم لاگین */}
         <div className="w-2/5 p-10 text-right relative">
          {/* تصویر بک‌گراند */}
          <img
            src={backgroundCircle}
            alt="Background Circle"
            className="absolute -right-10 -top-5 w-60"
          />

          {/* لوگوی متن */}
          <img
            src={mobinnetTextLogo} 
            alt="Mobiinnet Text Logo"
            className="w-40 mb-30 relative -right-33 top-10 z-10"
          />

          <h2 className="text-lg font-bold mb-6 relative z-10">
            سامانه پیامکی مبین‌نت
          </h2>

          {/* تب‌ها */}
          <div className="flex justify-center mb-6 border-b relative z-10">
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
