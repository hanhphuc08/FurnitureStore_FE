import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(emailOrUsername, password);
      console.log("Login success:", data);

      localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError(err.message || "Đăng nhập thất bại");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light px-4 py-8 font-display text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-xl bg-surface-light shadow-lg dark:bg-surface-dark">
        <div className="w-full p-8 sm:p-12 md:w-1/2 lg:p-16">
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-primary">chair</span>
            <h1 className="mt-4 text-3xl font-bold">Chào mừng trở lại</h1>
            <p className="mt-2 text-text-muted-light dark:text-text-dark/80">
              Đăng nhập để tiếp tục khám phá không gian sống mơ ước của bạn.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Email hoặc Tên đăng nhập</span>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-text-muted-light">person</span>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Nhập email hoặc tên đăng nhập"
                  className="h-12 w-full rounded-lg border border-text-muted-light/40 bg-background-light pl-12 pr-4 text-sm text-text-light placeholder:text-text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-text-dark/30 dark:bg-background-dark"
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Mật khẩu</span>
                <a className="text-primary hover:underline" href="/forgot-password">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-text-muted-light">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  className="h-12 w-full rounded-lg border border-text-muted-light/40 bg-background-light pl-12 pr-12 text-sm placeholder:text-text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-text-dark/30 dark:bg-background-dark"
                />
                <button type="button" className="absolute right-3 text-text-muted-light hover:text-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </label>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-bold text-white hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <div className="relative flex items-center py-2">
              <span className="flex-1 border-t border-text-muted-light/30" />
              <span className="mx-3 text-xs text-text-muted-light">Hoặc tiếp tục với</span>
              <span className="flex-1 border-t border-text-muted-light/30" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-text-muted-light/30 py-3 text-sm font-medium hover:bg-primary/10"
            >
              {/* SVG Google giữ nguyên */}
              Đăng nhập với Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted-light">
            Chưa có tài khoản?{" "}
            <a className="font-medium text-primary hover:underline" href="/register">
              Đăng ký ngay
            </a>
          </p>
        </div>

        <div
          className="hidden w-1/2 bg-cover bg-center md:block"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZ15Fg4xQ064MulkHxOfsdQ9Z0JKdFT61Oft866hyBJfT7Fxr6ZlQEoE2dcdpI7w8T-yRkyiXIQhukwodNOIi0UDnPmdGhpkffvs9CHG3jBGcCmSdJidki7tYi7AIkTowgdh1RKoiq7EwaQRV5I2_O6Mce6msL9TmQFsMAYiD10vajXzaf-z4ek4b6cUn2bPdoHs_7bXfGY411lkwZkWtbUbw8sFvu-dnuBxozRO4cFCkoPI8YSdyO1Pg8yuBWySf7glCkDB3EDaaw")',
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
