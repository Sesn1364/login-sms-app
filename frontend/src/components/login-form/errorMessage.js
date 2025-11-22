export function getErrorMessage(error) {
    // اگر سرور پیغام درست فرستاده باشد
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
  
    // خطای شبکه
    if (error?.message?.toLowerCase().includes("network")) {
      return "خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.";
    }
  
    // پیام عمومی
    return "ورود ناموفق. لطفاً اطلاعات را بررسی کنید.";
  }