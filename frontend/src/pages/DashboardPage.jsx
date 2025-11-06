import React from "react";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        🎉 خوش اومدی به داشبورد!
      </h1>

      {token ? (
        <p className="text-gray-700 break-words">
          <strong>توکن شما:</strong> <span className="font-mono text-sm">{token}</span>
        </p>
      ) : (
        <p className="text-red-600">توکن پیدا نشد!</p>
      )}
    </div>
  );
}
