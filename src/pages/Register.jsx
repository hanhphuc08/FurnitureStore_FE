// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api/authApi";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      setLoading(true);
      const res = await registerRequest(fullName, email, password);
      setSuccess(res.message || "Đăng ký thành công, vui lòng đăng nhập.");
      setLoading(false);

      // cho user thấy thông báo 1 chút rồi chuyển sang login
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Đăng ký thất bại.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light font-display text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-background-dark lg:flex">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6UIl8GFJ5nVQnhr2QA1gEbyA0jF9VkHwfFrytBBGfZMZzzp9ZBi-l52uafGzSXmt9fzWAkRr4sVK5VhXzj7YaaBJ5_aCJ_tyYMKvSUDrE4uc7lSJU9XIKBcyYUCnlio60ETDARVR3QaesSzxBTMVDcKLhCFHVITXUPm6jAjbp80BMOut0UneFEcqMAopsq8CB5IujVWDHweBp_4GJFfdX6sCgyaTHrlU31hpCA95k1knU5iaSHFFXpXUQ-O91N7Ee3YM0-H3o87qm"
          alt="Living room"
        />
        <div className="relative z-10 max-w-md space-y-4 p-8 text-white">
          <h1 className="text-4xl font-black leading-tight">Khám phá không gian sống mơ ước của bạn.</h1>
          <p className="text-lg text-gray-300">Tạo tài khoản để nhận ưu đãi độc quyền và nguồn cảm hứng bất tận.</p>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center bg-background-light px-4 py-24 dark:bg-background-dark lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div>
            <p className="text-3xl font-black">Tạo Tài Khoản Mới</p>
            <p className="mt-2 text-base text-text-muted-light">
              Đăng ký để nhận tư vấn thiết kế miễn phí và lưu lại những sản phẩm yêu thích.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="full-name" className="pb-2 text-base font-medium">
                Họ và Tên
              </label>
              <input
                id="full-name"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-14 rounded-lg border border-text-muted-light/40 bg-background-light px-4 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="pb-2 text-base font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nguyenvana@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-lg border border-text-muted-light/40 bg-background-light px-4 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="pb-2 text-base font-medium">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 w-full rounded-lg border border-text-muted-light/40 bg-background-light px-4 pr-12 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
                />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted-light">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="pb-2 text-base font-medium">
                Xác nhận Mật khẩu
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-14 rounded-lg border border-text-muted-light/40 bg-background-light px-4 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
              />
              {error && <p className="mt-2 text-sm text-[#DC3545]">{error}</p>}
            </div>

            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-lg bg-primary text-base font-bold text-text-light hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
            </button>
          </form>

          {/* Phần social + điều khoản giữ nguyên */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
