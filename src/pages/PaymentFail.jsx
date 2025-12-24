import { Link } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";

function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
        <div className="rounded-xl bg-white p-8 shadow-sm dark:bg-surface-dark">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600">Thanh toán thất bại</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Có lỗi xảy ra trong quá trình thanh toán. Đơn hàng của bạn chưa được xử lý.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Vui lòng kiểm tra lại thông tin và thử thanh toán lại, hoặc liên hệ với chúng tôi để được hỗ trợ.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/orders"
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
              >
                Xem đơn hàng
              </Link>
              <Link
                to="/cart"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
              >
                Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}

export default PaymentFailPage;