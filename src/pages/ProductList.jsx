import MainFooter from '../components/layout/MainFooter.jsx'
import MainHeader from '../components/layout/MainHeader.jsx'

const productFilters = ['Tất cả', 'Sofa', 'Ghế bành', 'Bàn cà phê']
const materials = ['Vải', 'Da', 'Gỗ', 'Kim loại']

const catalogProducts = [
  {
    name: 'Sofa Vải Cao Cấp',
    price: '12.500.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPgvXO6ixIMxvkE7hDH7SyJhDYQYvMDv72oZIxite6j02eXpROXUvahf8pgffLNxyJd9BIaa3Eqs1VMgaX3Ha6R9dYbHqS_wdZzM6_rmvyz0vflI2O4ZURBfI6NnyOXkHu00AIetxCDniXdUiU4-iy9FGEerrBBE8wieJ1bX_xJ-WS-JDDng_RXqsfThMGy8HJZiy9w1tBIG4bGer3EGmxbJGIVrHrROq4YuufpGfF7TmKIyg8r8MkxSpy0XRN15GlXuEmx6nBuDRB',
  },
  {
    name: 'Ghế Bành Da Thật',
    price: '8.900.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdlOhF_a58oORazBKIHJrC6tSSDH0jbXXWlia4wpSqf527MyQQAGqCson-4fEiTC3C3ocpWXsbrbrdHIWxscJK3yKuOm9yzey5WECk37jQArPsJrbSFPPG0-yxB74qDb-nRr-LguOY91etacQcit8T3ITK5ESnedabgTlWCbXQ_JbZ4XWN_W-vZyv--jnCPsxAnJ-IG-cFIqHA5MWcD5Gz2oohop4SzWA7q9vy6wdsAwkTqc9CsjU6aNWMIUERM4F9xbNnz6A8oLw2',
  },
  {
    name: 'Bàn Cà Phê Gỗ Sồi',
    price: '4.200.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3OHI3ODsZEYTfuBlp1YAPox25qs9t8T-519RSKlx4oqRaPwqiYQ5RmEzOFwzKyyrNdRFhK9wf6wp9BhH2LH6Id9MX6bjHdVE1haAPFa0vGq5MW7EXtcSQvBjnCyu0wP4ZBgWPuCAHog5scVA4ZfudPpc0pjJyZ-06MB8KYbhDYOdpQ29dAg5nBB26kmOIiEXgnPF6wUfJjxwFCYHXgoNrxA31KM07xPKH9dlKvYJERTi0X_JSicieOoIN1Qgrn_4X5D1S3G0DvMXc',
  },
  {
    name: 'Kệ Tivi Hiện Đại',
    price: '6.800.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdPqCjxx4iNCmC91MhKCFZm8lDD2rMAEvRXEJHNUE1EklBzarNvrNTbJs0kLsxHOjgp_yyBN9eBHXRIjWqb0nLayCiLg9Unvo0fnn7p07a6A7eRDdi6xiLFkS5ShKa3ZTiN5GP2l8dQY7KP4MZt18sMUlbt1sWz_Z7JIZlD8Z-PO8QRyJ_MS2uYcRc8RMRRyMgKFqCyUAQlVAzNY6B-R36_Q2xz9ecB7jNSOaoJIbGTL2hh23ZKzO-us8hpet2Mg1_Mv8i7Gsnm-I',
  },
  {
    name: 'Ghế Đơn Thư Giãn',
    price: '3.500.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWy7FOmbYP4_eXLqKg1pENSG2ABq8vNT9jL6IYR7ftq_d_u3mBrhVCDUd5LVJLhNT0yX82JQeAkjdegiLBpqz-5cVvqN-Kgak2WlZs73PMg-g2oRg2WbQmPzpz7FA3B1T4toX_16sbFeC50prBqFD4yp73XCuG0gRavrC5geF288ngCOqKg_v14Z5EXWsZaQt_udB4s2gTWU1jDOuq8tGLoGyZhk6vRDk2YwMbImXxyoeb9rAGNpzLWQCCdS3XgzZFLMbNRdIiwz0e',
  },
  {
    name: 'Tủ Trang Trí Vintage',
    price: '7.100.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHKcpjlZoqLR--2ZPfBHeF606LjPS1CVfFMSOSaoUdL6vRyU5LZJ_iBffKqiqbD9dcDevXwfIP7BUotI-o3Xdao5pPzwAeVEEgwDzX2gbxmWmpk5nvDa8yG7ejoQFrZjRfkH1emZNmSYcpwGYipi-scuPiDvvNBCeNG_MEtdllvTz49z84PVN5izBb4r2DGkQujI_1u1qhOAkUJoXK92GCl9Be6tzuJkLi8hqvFzYqw-YBJI7N6cYPtqUyMOz7r92QLiqRxdQFwwQY',
  },
  {
    name: 'Sofa Góc Hiện Đại',
    price: '15.200.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPris_3d5oXqQvlfgIbX2fRNVx02ZuUC1zaSoXXtJSmESnqiDIZlIFgXxNAa6zM_4BmzNHKsU6hHsRFustzQ-TEuubkpkUE9QpksqzBUdWj1BYbeEgKjP2TZskAP7VwROCN4L1yXdZoLYWZG6C8SFzVGgF-A7-atHr-vjq63t1tfq_HZQHy0rvm2pEU2bpzxvHRkmxYM8joueDrBpqnvpRe2Q7lW4rKdnM3IDa6LCgUkrX1HDQfhbpyzal4ToCvt6cYE1QYZjC6-Y6',
  },
  {
    name: 'Ghế Bành Accent',
    price: '5.400.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkP5UphWm4H48QkK8YcCUsH1fsRXhaYRz2gUXtordo16Pa1shGzAaRN4bdyXEfcMTNN-jY2JZhLlPxvgghMEtvc-sPU6AZ2OH75COA-0UrYDw5gRApAXceVMuW2NxizOiV5zWQoCCXv-sLfBsvJ6yNrQx7JvxKsJOJnz41SIeZVCR3_IjiyTuQmzNJC9PstuFq3DDjZxqaFl5EzNFzVRbQ4VeoQDgoa2NKLTtSgyLRsYpvMoP6Mkj44n1xrlrUuvA3sMbbv6c0Eaxf',
  },
  {
    name: 'Bàn Console Tự Nhiên',
    price: '4.900.000đ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjiArcoG2MKKp7iuivumoTMgbYvDhWRIeHqzrQQ_QifPeLoTrYigT4HwbjvLSrxIWDX4A2NgMOTY-bPAGuyDW8b1buhz_DxKlN8VYOIsMSZcYySwBBmrwLS4ZjacHSpAwyyVs4n6dpcrCGsgUxY0NxTfwNzv1tYEiEfouUWiRm3euVJzzaMhe1UVWcMOly7pvtloXXprhlscxcydXaK9-DRLu-5Vx5uvBWZYEP0KF_YOZ8naxXTcAs8hrJ37-psP80YYq-IBXsC140',
  },
]

function ProductListPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#343A40] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 lg:flex-row lg:gap-8">
        <aside className="lg:w-1/4">
          <div className="sticky top-28 space-y-6">
            <div>
              <h3 className="text-xl font-bold">Lọc sản phẩm</h3>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Danh mục</h4>
              <div className="space-y-2 text-[#495057]">
                {productFilters.map((filter, index) => (
                  <label key={filter} className="flex cursor-pointer items-center gap-2">
                    <input
                      defaultChecked={index === 0}
                      name="category"
                      type="radio"
                      className="text-[#2F4F4F] focus:ring-[#2F4F4F]/30"
                    />
                    <span>{filter}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <h4 className="mb-3 font-semibold">Chất liệu</h4>
              <div className="space-y-2 text-[#495057]">
                {materials.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="rounded text-[#2F4F4F] focus:ring-[#2F4F4F]/30" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <h4 className="mb-3 font-semibold">Mức giá</h4>
              <input
                type="range"
                min="1000000"
                max="50000000"
                defaultValue="25000000"
                className="w-full accent-[#2F4F4F]"
              />
              <div className="mt-2 flex justify-between text-sm text-[#6c757d]">
                <span>1.000.000đ</span>
                <span>50.000.000đ</span>
              </div>
            </div>
            <div className="flex gap-3 border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <button className="flex-1 rounded-lg bg-[#2F4F4F] py-2 text-sm font-bold text-white">Áp dụng</button>
              <button className="flex-1 rounded-lg border border-[#DEE2E6] py-2 text-sm font-bold text-[#6c757d]">
                Đặt lại
              </button>
            </div>
          </div>
        </aside>

        <section className="mt-8 flex-1 lg:mt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">Sofa &amp; Ghế bành</h1>
              <p className="text-[#6c757d]">Hiển thị 24 trên 128 sản phẩm</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-[#DEE2E6] px-4 py-2 text-sm">
              Sắp xếp: Phổ biến
              <span className="material-symbols-outlined text-[#6c757d]">keyboard_arrow_down</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            {catalogProducts.map((product) => (
              <div key={product.name} className="group pb-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div
                    className="aspect-[3/4] w-full rounded-lg bg-cover bg-center transition group-hover:scale-105"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[#343A40]">favorite</span>
                  </button>
                </div>
                <div className="mt-3">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-[#2F4F4F]">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <nav className="mt-12 flex justify-center">
            <ul className="flex h-10 items-center">
              <li>
                <a className="flex h-10 items-center rounded-l-lg border border-r-0 border-[#DEE2E6] px-4 text-[#6c757d]" href="#">
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </a>
              </li>
              {[1, 2, 3].map((page, index) => (
                <li key={page}>
                  <a
                    href="#"
                    className={`flex h-10 items-center border border-r-0 border-[#DEE2E6] px-4 ${
                      index === 0 ? 'bg-[#2F4F4F] text-white' : 'text-[#6c757d]'
                    }`}
                  >
                    {page}
                  </a>
                </li>
              ))}
              <li>
                <span className="flex h-10 items-center border border-r-0 border-[#DEE2E6] px-4 text-[#6c757d]">...</span>
              </li>
              <li>
                <a className="flex h-10 items-center border border-[#DEE2E6] px-4 text-[#6c757d]" href="#">
                  8
                </a>
              </li>
              <li>
                <a className="flex h-10 items-center rounded-r-lg border border-[#DEE2E6] px-4 text-[#6c757d]" href="#">
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </main>

      <MainFooter />
    </div>
  )
}

export default ProductListPage

