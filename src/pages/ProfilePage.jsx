
import { useEffect, useState } from "react";
import MainHeader from "../components/layout/MainHeader.jsx";
import MainFooter from "../components/layout/MainFooter.jsx";


function ProfilePage() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Chỉnh sửa trực tiếp trên giao diện
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ fullName: "", phone: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // Modal Quên mật khẩu (OTP)
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: nhập email, 2: nhập otp + mật khẩu mới, 3: thành công
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPass, setForgotNewPass] = useState("");
  const [forgotConfirmPass, setForgotConfirmPass] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState(null);
  const [forgotSuccess, setForgotSuccess] = useState(null);

  const handleForgotOpen = () => {
    setShowForgot(true);
    setForgotStep(1);
    setForgotEmail(user?.email || "");
    setForgotNewPass("");
    setForgotConfirmPass("");
    setForgotError(null);
    setForgotSuccess(null);
  };

  const handleForgotClose = () => {
    setShowForgot(false);
  };

  // Gọi API thật cho forgot/reset password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError(null);
    setForgotSuccess(null);
    try {
      if (forgotStep === 1) {
        // Gửi email nhận OTP
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Gửi email thất bại");
        }
        setForgotStep(2);
        setForgotSuccess("Đã gửi mã OTP về email. Vui lòng kiểm tra hộp thư!");
      } else if (forgotStep === 2) {
        if (forgotNewPass.length < 6) {
          setForgotError("Mật khẩu phải từ 6 ký tự");
          setForgotLoading(false);
          return;
        }
        if (forgotNewPass !== forgotConfirmPass) {
          setForgotError("Mật khẩu nhập lại không khớp");
          setForgotLoading(false);
          return;
        }
        // Gửi OTP + email + mật khẩu mới
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail, otp: forgotOtp, newPassword: forgotNewPass }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Đổi mật khẩu thất bại");
        }
        setForgotSuccess("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
        setForgotStep(3);
        setTimeout(() => setShowForgot(false), 2000);
      }
    } catch (err) {
      setForgotError(err.message || "Có lỗi xảy ra, thử lại sau!");
    } finally {
      setForgotLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setEditData({
        fullName: user.fullName || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditMode(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const res = await fetch("http://localhost:8686/api/me", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      const data = await res.json();
      setUser(data);
      setEditMode(false);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8686/api/me", { credentials: "include" });
        if (res.status === 401) {
          setUser(null);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Không thể tải thông tin cá nhân");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    async function fetchAddresses() {
      try {
        const res = await fetch("http://localhost:8686/api/me/addresses", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setAddresses(Array.isArray(data) ? data : []);
        }
      } catch {
        // Ignore address fetch errors
      }
    }
    fetchProfile();
    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p>Đang tải thông tin cá nhân...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
          <h2 className="text-2xl font-bold mb-2">Không thể tải thông tin cá nhân</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg">Thử lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light text-text-light min-h-screen font-display dark:bg-background-dark dark:text-text-dark">
      <MainHeader />
      <main className="flex flex-col">
        {/* BREADCRUMB */}
        <section className="border-b bg-white/50 py-4 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" className="text-gray-500 hover:text-primary transition">
                    Trang chủ
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-gray-400 text-sm mx-2">
                    chevron_right
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Thông tin cá nhân
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* HEADER */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-black text-text-light md:text-5xl">
                Thông tin cá nhân
              </h1>
              <p className="mt-4 text-lg text-text-light/80">
                Xem và cập nhật thông tin tài khoản của bạn
              </p>
            </div>
          </div>
        </section>

        {/* PROFILE CARD */}
        <section className="py-12">
          <div className="mx-auto max-w-xl px-4">
            {!user ? (
              <div className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">account_circle</span>
                <h2 className="text-2xl font-bold mb-2">Thông tin cá nhân</h2>
                <p className="text-gray-500 mb-2">Bạn chưa đăng nhập.</p>
                <a href="/login" className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition">Đăng nhập</a>
              </div>
            ) : (
              <div className="p-8 bg-white rounded-2xl shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="w-[90px] h-[90px] rounded-full object-cover border-4 border-primary/20 bg-primary/10"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[90px] text-primary bg-primary/10 rounded-full p-2 border-4 border-primary/20">account_circle</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mt-3 mb-1">{user.fullName}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <form className="bg-gray-50 rounded-xl p-6 mb-4" onSubmit={handleEditSubmit}>
                  <div className="flex items-center mb-4">
                    <span className="material-symbols-outlined text-primary mr-2">badge</span>
                    <span className="font-semibold w-32">Họ tên:</span>
                    <input
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 flex-1"
                      required
                      disabled={editLoading}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="material-symbols-outlined text-primary mr-2">mail</span>
                    <span className="font-semibold w-32">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="material-symbols-outlined text-primary mr-2">call</span>
                    <span className="font-semibold w-32">Số điện thoại:</span>
                    <input
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="border rounded px-2 py-1 flex-1"
                      disabled={editLoading}
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="material-symbols-outlined text-primary mr-2">location_on</span>
                    <span className="font-semibold w-32">Địa chỉ:</span>
                    <span>
                      {addresses.length > 0
                        ? `${addresses[0].street}, ${addresses[0].ward}, ${addresses[0].district}, ${addresses[0].province}`
                        : <span className="italic text-gray-400">Chưa cập nhật</span>}
                    </span>
                  </div>
                  {user.role && user.role !== "CUSTOMER" && (
                    <div className="flex items-center mb-4">
                      <span className="material-symbols-outlined text-primary mr-2">verified_user</span>
                      <span className="font-semibold w-32">Vai trò:</span>
                      <span>{user.role}</span>
                    </div>
                  )}
                  {user.role === "CUSTOMER" && (
                    <div className="flex items-center mb-4">
                      <span className="material-symbols-outlined text-primary mr-2">verified_user</span>
                      <span className="font-semibold w-32">Vai trò:</span>
                      <span>Khách hàng</span>
                    </div>
                  )}
                  {user.status && (
                    <div className="flex items-center mb-4">
                      <span className="material-symbols-outlined text-primary mr-2">info</span>
                      <span className="font-semibold w-32">Trạng thái:</span>
                      <span>{user.status}</span>
                    </div>
                  )}
                  {user.createdAt && (
                    <div className="flex items-center mb-4">
                      <span className="material-symbols-outlined text-primary mr-2">calendar_month</span>
                      <span className="font-semibold w-32">Ngày tạo:</span>
                      <span>{new Date(user.createdAt).toLocaleString()}</span>
                    </div>
                  )}
                  {user.updatedAt && (
                    <div className="flex items-center mb-4">
                      <span className="material-symbols-outlined text-primary mr-2">update</span>
                      <span className="font-semibold w-32">Cập nhật:</span>
                      <span>{new Date(user.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                  {editError && <div className="text-red-500 mb-2">{editError}</div>}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!editMode || editLoading}
                      className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition flex items-center gap-1 disabled:opacity-60"
                    >
                      {editLoading ? "Đang lưu..." : "Cập nhật"}
                    </button>
                  </div>
                </form>

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-lg bg-gray-200 text-primary font-semibold shadow hover:bg-gray-300 transition flex items-center gap-1"
                    onClick={handleForgotOpen}
                  >
                    <span className="material-symbols-outlined text-base">lock_reset</span>
                    Đổi mật khẩu
                  </button>
                </div>

                {/* Modal Quên mật khẩu */}
                {showForgot && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <form onSubmit={handleForgotSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button type="button" onClick={handleForgotClose} className="absolute top-2 right-2 text-gray-400 hover:text-primary">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                      <h2 className="text-xl font-bold mb-6">Quên mật khẩu</h2>
                      {forgotStep === 1 && (
                        <div className="mb-4">
                          <label className="block font-semibold mb-1">Email</label>
                          <input type="email" className="w-full border rounded px-3 py-2" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required disabled={!!user?.email} />
                        </div>
                      )}
                      {forgotStep === 2 && (
                        <>
                          <div className="mb-4">
                            <label className="block font-semibold mb-1">Mã OTP</label>
                            <input className="w-full border rounded px-3 py-2" value={forgotOtp} onChange={e => setForgotOtp(e.target.value)} required />
                          </div>
                          <div className="mb-4">
                            <label className="block font-semibold mb-1">Mật khẩu mới</label>
                            <input type="password" className="w-full border rounded px-3 py-2" value={forgotNewPass} onChange={e => setForgotNewPass(e.target.value)} required minLength={6} />
                          </div>
                          <div className="mb-4">
                            <label className="block font-semibold mb-1">Nhập lại mật khẩu</label>
                            <input type="password" className="w-full border rounded px-3 py-2" value={forgotConfirmPass} onChange={e => setForgotConfirmPass(e.target.value)} required minLength={6} />
                          </div>
                        </>
                      )}
                      {forgotStep === 3 && (
                        <div className="mb-4 text-green-600 font-semibold text-center">
                          Đổi mật khẩu thành công! Hãy đăng nhập lại.
                        </div>
                      )}
                      {forgotError && <div className="text-red-500 mb-2">{forgotError}</div>}
                      {forgotSuccess && <div className="text-green-600 mb-2">{forgotSuccess}</div>}
                      {forgotStep !== 3 && (
                        <button type="submit" disabled={forgotLoading} className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 hover:bg-primary/90 transition">
                          {forgotLoading
                            ? "Đang xử lý..."
                            : forgotStep === 1
                            ? "Gửi mã OTP"
                            : "Đổi mật khẩu"}
                        </button>
                      )}
                    </form>
                  </div>
                )}

                {/* Modal chỉnh sửa */}
              </div>
            )}
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}

export default ProfilePage;
