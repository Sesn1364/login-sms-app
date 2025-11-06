import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* مسیر صفحه ورود */}
        <Route path="/" element={<LoginPage />} />

        {/* مسیر صفحه داشبورد */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
