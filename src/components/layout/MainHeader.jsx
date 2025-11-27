import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Bộ sưu tập', path: '/products' },
  { label: 'Dịch vụ tư vấn', path: '/consulting' },
  { label: 'Blog', path: '#' },
  { label: 'Liên hệ', path: '#' },
]

function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex justify-center border-b border-black/10 bg-background-light/80 backdrop-blur-sm dark:border-white/10 dark:bg-background-dark/80">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.1739 20.1739 27.8261 5.82609c1.3105 1.31054.5728 4.36151-1.6259 7.93931-1.3464 2.1909-3.2407 4.5794-5.548 6.8867-2.3073 2.3073-4.6958 4.2016-6.8868 5.548-3.5778 2.1987-6.6287 2.9365-7.9392 1.6259L20.1739 42.1739c1.3106 1.3106 4.3616.5728 7.9394-1.6259 2.1909-1.3464 4.5794-3.2407 6.8867-5.548 2.3073-2.3073 4.2016-4.6958 5.548-6.8867 2.1987-3.5778 2.9365-6.6288 1.6259-7.9393Z"
                  fill="currentColor"
                />
                <path
                  clipRule="evenodd"
                  d="M7.24189 26.4066c.0718.0345.40015.1571 1.28315-.0328 1.06958-.23 2.50929-.8427 4.19329-1.8775 2.04-1.2537 4.3073-3.046 6.5197-5.2583 2.2123-2.2124 4.0046-4.4797 5.2583-6.5197 1.0348-1.684 1.6475-3.1237 1.8775-4.19329.1899-.883.0673-1.21135.0328-1.28315-.0616-.02943-.2636-.09654-.7402-.05009-.6919.06745-1.671.358-2.8965.95098-2.433 1.17729-5.433 3.34868-8.3557 6.27138-2.9227 2.9227-5.09413 5.9237-6.27142 8.3568-.59298 1.2255-.88353 2.2046-.95098 2.8965-.04646.4766.02066.6786.05009.7402Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight text-text-light dark:text-text-dark">Nội Thất P2T</h2>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link key={item.label} to={item.path} className="text-sm font-medium hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <label className="hidden min-w-40 max-w-64 flex-col sm:flex">
            <div className="flex h-10 items-center rounded-lg bg-primary/20">
              <span className="material-symbols-outlined px-3 text-text-muted-light">search</span>
              <input
                className="flex-1 bg-transparent text-sm text-text-light placeholder:text-text-muted-light focus:outline-none"
                placeholder="Tìm kiếm..."
              />
            </div>
          </label>
          <div className="flex gap-2">
            <Link
              to="/cart"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-text-light"
              aria-label="Giỏ hàng"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <Link
              to="/login"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-text-light"
              aria-label="Đăng nhập"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainHeader

