import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // تبدیل به ثانیه

      if (decoded.exp < currentTime) {
        // توکن منقضی شده
        alert("زمان جلسه‌ی شما به پایان رسیده. لطفاً دوباره وارد شوید.");
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const token = localStorage.getItem("token");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 خوش اومدی به داشبورد!
      </h1>

      {token ? (
        <p className="text-gray-700 break-words">
          <strong>توکن شما:</strong>{" "}
          <span className="font-mono text-sm">{token}</span>
        </p>
      ) : (
        <p className="text-red-600">توکن پیدا نشد!</p>
      )}
    </div>
  );
}
