import { useCallback } from "react";
import axios from "axios";
import { getErrorMessage } from "./errorMessage";

export function useLogin({
  navigate,
  setMessage,
  refreshCaptchaFn,
  setCaptcha,
  captcha,
  mobile,
  password,
  captchaId,
}) {
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setMessage("");

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            phone: mobile,
            password,
            captcha,
            captchaId,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setMessage("✅ ورود موفقیت‌آمیز بود!");
          navigate("/dashboard");
        }
      } catch (error) {
        const msg = getErrorMessage(error);
        setMessage("❌ " + msg);

        if (refreshCaptchaFn) refreshCaptchaFn();
        setCaptcha("");
      }
    },
    [
      navigate,
      setMessage,
      refreshCaptchaFn,
      setCaptcha,
      captcha,
      mobile,
      password,
      captchaId,
    ]
  );

  return { handleSubmit };
}
