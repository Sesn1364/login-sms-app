import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [authStatus, setAuthStatus] = useState("loading"); // "loading" | "ok" | "unauth"

  useEffect(() => {
    let mounted = true;

    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setAuthStatus("ok"); // کاربر معتبر
      })
      .catch((err) => {
        if (!mounted) return;
        setAuthStatus("unauth"); // لاگین نکرده یا توکن منقضی
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (authStatus === "loading") {
    return <div>در حال بررسی وضعیت ورود...</div>; // یا spinner
  }

  if (authStatus === "unauth") {
    return <Navigate to="/" replace />;
  }

  return children; // کاربر معتبر
}
