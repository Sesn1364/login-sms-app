import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // اگه توکن وجود نداره، برش گردون به صفحه لاگین
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // در غیر این صورت، اجازه بده وارد صفحه بشه
  return children;
}
