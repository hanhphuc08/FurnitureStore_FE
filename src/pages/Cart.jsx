import { Link } from 'react-router-dom'
import MainFooter from '../components/layout/MainFooter.jsx'
import MainHeader from '../components/layout/MainHeader.jsx'

const cartItems = [
  {
    name: 'Ghế Sofa Vải Lông Cừu',
    detail: 'Màu sắc: Kem',
    price: 12500000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnrs5aMYHAdfePq62_twJq2Me_3ubPdKjzb1Knvkc_Nj3NzpFLFJpERbqJUi23N9fEz7hdv_84W_BZNaBv15r8OoBotXNYrIQNFkmV0bqFwpglH-nHNGFfDURMrXfh22EMY4o-KZs_WvE6u43rDjUhoPXz0njU8uLHKjx2ga9Mrm-FeR72Rk28Crt4MHl87dzK4YVWkeTa6b7fo-TmcPC9FnzD8DeMNgqtwxfP_RQpNsOLYUCJes2bufPGUz4BWzgWfiWQ68V_xER',
  },
  {
    name: 'Bàn Trà Gỗ Sồi Tự Nhiên',
    detail: 'Kích thước: 120cm x 60cm',
    price: 4800000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKl8P8_xK66t-C9KtCLmKunffjTmgYM9NNdBz1cVkCa4YwqxhHCpmlR6lbiyiS0mJeB0mtAgbxwgldnobwGZwlxxymjmvetV0fD1u5FvB-caZQGcSyhFHKYUWt5AoJSuHdFUXGqfZWRhLvUSQxSlHGliT8kuSLOmfFddgodkRovH8MryhVcweoVBAkWW8ivEYP1-NxkAOIb8sbBquXrrlGm6kWhhqIDN8Vb3-678K3ASTZObASzgAVW5KLzI2Za_sCfuQHpWtJ2Oee',
  },
]

const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)

function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#0d1b1b] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link className="font-medium text-primary hover:underline" to="/">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">Giỏ hàng</span>
        </div>
        <h2 className="mt-4 text-3xl font-black text-[#0d1b1b] dark:text-text-dark">Giỏ hàng của bạn</h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            {cartItems.map((item) => (
              <article
                key={item.name}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/60 sm:flex-row sm:items-center"
              >
                <div
                  className="h-28 w-full rounded-lg bg-cover bg-center sm:w-28"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-base font-bold">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                  <p className="text-sm font-medium text-primary">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1 dark:border-gray-700">
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      -
                    </button>
                    <input
                      className="w-10 border-none bg-transparent text-center focus:outline-none"
                      type="number"
                      min="1"
                      defaultValue="1"
                    />
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      +
                    </button>
                  </div>
                  <p className="text-base font-bold text-[#0d1b1b] dark:text-text-dark">{formatCurrency(item.price)}</p>
                  <button className="text-red-500 hover:text-red-700">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </article>
            ))}
            <Link className="inline-flex items-center gap-2 text-primary hover:underline" to="/products">
              <span className="material-symbols-outlined">arrow_back</span>
              Tiếp tục mua sắm
            </Link>
          </section>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/60">
              <h3 className="text-xl font-bold">Tổng quan đơn hàng</h3>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <button className="w-full rounded-lg bg-primary py-3 text-base font-bold text-white hover:bg-primary/90">
                Tiến hành thanh toán
              </button>
              <div className="rounded-md bg-gray-100 p-3 text-center text-xs text-gray-500 dark:bg-gray-800/60">
                🚚 Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ
              </div>
            </div>
          </aside>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}

export default CartPage

