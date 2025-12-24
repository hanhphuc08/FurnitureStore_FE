import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { getCurrentUser, logout } from "../../utils/auth";

const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Bộ sưu tập', path: '/products' },
  { label: 'Dịch vụ tư vấn', path: '/consulting' },
  { label: 'Blog', path: '/blog' },
  { label: 'Liên hệ', path: '/contact' },
]


function MainHeader()
{
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser()); 
  const [openMenu, setOpenMenu] = useState(false); 
  function handleCartClick() 
  { 
    if (!user) navigate("/login"); 
    else navigate("/cart"); } 
  async function handleLogout() 
  { 
    await logout(); 
    setUser(null); 
    setOpenMenu(false); 
    navigate("/login"); 
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          Nội Thất P2T
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="text-gray-700 hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative flex items-center gap-3">
          {/* CART */}
          <button
            onClick={handleCartClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>

          {/* ACCOUNT */}
          {!user ? (
            <Link
              to="/login"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"
            >
              <span className="material-symbols-outlined">
                account_circle
              </span>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenMenu((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                  <div className="px-4 py-2 text-sm font-semibold">
                    👋 {user.fullName || "Tài khoản"}
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Thông tin cá nhân
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Đơn hàng
                  </Link>
                      {user?.role === "ADMIN" && (
                  <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Quản trị
                  </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
