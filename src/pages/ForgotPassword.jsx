
import React, { useState } from "react";

function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập otp + mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        let data = {};
        try {
          const text = await res.text();
          data = text && res.headers.get("content-type")?.includes("application/json") ? JSON.parse(text) : {};
        } catch {
          // ignore
        }
        throw new Error(data.message || "Gửi email thất bại");
      }
      setStep(2);
      setSuccess("Đã gửi mã OTP về email. Vui lòng kiểm tra hộp thư!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      if (!res.ok) {
        let data = {};
        try {
          const text = await res.text();
          data = text && res.headers.get("content-type")?.includes("application/json") ? JSON.parse(text) : {};
        } catch {
          // ignore
        }
        throw new Error(data.message || "Đổi mật khẩu thất bại");
      }
      setSuccess("Đổi mật khẩu thành công! Bạn có thể đăng nhập lại.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4 font-display text-[#343A40] dark:bg-background-dark dark:text-text-dark">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-surface-dark">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-4xl text-[#4A6D7C]">chair</span>
            <span className="text-2xl font-bold">Nội Thất P2T</span>
          </div>
          <h1 className="text-3xl font-black">Quên Mật Khẩu?</h1>
          <p className="mt-2 text-base text-[#6c757d]">
            {step === 1 && "Chúng tôi sẽ gửi một mã OTP đến email của bạn."}
            {step === 2 && "Nhập mã OTP và mật khẩu mới để đặt lại mật khẩu."}
            {step === 3 && "Đổi mật khẩu thành công!"}
          </p>
        </div>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mt-4 text-green-600 text-center">{success}</div>}
        {step === 1 && (
          <form className="mt-8 space-y-4" onSubmit={handleSendEmail}>
            <label className="flex flex-col gap-2 text-sm font-medium text-[#343A40]">
              Địa chỉ email
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="h-12 rounded-lg border border-[#dee2e6] bg-[#F8F9FA] px-3 text-base text-[#343A40] placeholder:text-[#6c757d] focus:border-[#4A6D7C] focus:outline-none focus:ring-2 focus:ring-[#4A6D7C]/30 dark:border-border-dark dark:bg-background-dark dark:text-text-dark"
              />
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#4A6D7C] py-3 font-bold text-white hover:bg-[#3c5562]"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi Yêu Cầu"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form className="mt-8 space-y-4" onSubmit={handleResetPassword}>
            <label className="flex flex-col gap-2 text-sm font-medium text-[#343A40]">
              Mã OTP
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                className="h-12 rounded-lg border border-[#dee2e6] bg-[#F8F9FA] px-3 text-base text-[#343A40] placeholder:text-[#6c757d] focus:border-[#4A6D7C] focus:outline-none focus:ring-2 focus:ring-[#4A6D7C]/30 dark:border-border-dark dark:bg-background-dark dark:text-text-dark"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-[#343A40]">
              Mật khẩu mới
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="h-12 rounded-lg border border-[#dee2e6] bg-[#F8F9FA] px-3 text-base text-[#343A40] placeholder:text-[#6c757d] focus:border-[#4A6D7C] focus:outline-none focus:ring-2 focus:ring-[#4A6D7C]/30 dark:border-border-dark dark:bg-background-dark dark:text-text-dark"
              />
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#4A6D7C] py-3 font-bold text-white hover:bg-[#3c5562]"
              disabled={loading}
            >
              {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
            </button>
          </form>
        )}
        {step === 3 && (
          <div className="mt-8 text-center">
            <a className="text-sm text-[#6c757d] hover:text-[#4A6D7C]" href="/login">
              Đăng nhập ngay
            </a>
          </div>
        )}
        <div className="mt-6 text-center">
          <a className="text-sm text-[#6c757d] hover:text-[#4A6D7C]" href="/login">
            Quay lại trang Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

