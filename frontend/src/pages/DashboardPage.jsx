import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null); // اطلاعات کاربر
  const [loading, setLoading] = useState(true); // حالت بارگذاری
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // درخواست به سرور برای گرفتن اطلاعات کاربر
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Auth error:", err);
        setLoading(false);
        navigate("/"); // اگر لاگین نکرده یا توکن منقضی، بازگشت به صفحه ورود
      });

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return <div>در حال بارگذاری داشبورد...</div>; // یا spinner
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 خوش اومدی به داشبورد!
      </h1>

      {user ? (
        <div className="text-gray-700">
          <p>
            <strong>نام کاربری:</strong> {user.username}
          </p>
          <p>
            <strong>شماره موبایل:</strong> {user.phone}
          </p>
        </div>
      ) : (
        <p className="text-red-600">اطلاعات کاربر بارگذاری نشد!</p>
      )}
    </div>
  );
}
