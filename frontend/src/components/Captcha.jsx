// components/Captcha.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Captcha({ onChange, onRefresh }) {
  const [svg, setSvg] = useState(null);
  const [captchaId, setCaptchaId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCaptcha = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/captcha");
      setSvg(res.data.svg);
      setCaptchaId(res.data.captchaId);

      if (onChange) onChange({ captchaId: res.data.captchaId });

      // ارسال تابع رفرش به والد
      if (onRefresh) onRefresh(() => loadCaptcha());
    } catch (err) {
      console.error("Failed to load captcha", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2">
      {svg ? (
        <img src={svg} alt="captcha" className="w-28 h-10 object-contain" />
      ) : (
        <div className="w-28 h-10 flex items-center justify-center">
          {loading ? "..." : "خطا"}
        </div>
      )}

      <button
        type="button"
        onClick={loadCaptcha}
        className="ml-2 text-gray-600 hover:text-black text-xl"
      >
        🔄
      </button>
    </div>
  );
}
