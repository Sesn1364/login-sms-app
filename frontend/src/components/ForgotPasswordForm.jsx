import React from "react";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="کد ملی"
        className="w-full p-3 border rounded-lg focus:outline-green-600"
      />
      <input
        type="text"
        placeholder="شماره موبایل"
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
          className="flex-1 p-3 border rounded-lg focus:outline-green-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        ارسال
      </button>
    </form>
  );
}
