function ForgotPasswordPage() {
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
            Chúng tôi sẽ gửi một liên kết đặt lại mật khẩu đến email của bạn.
          </p>
        </div>
        <form className="mt-8 space-y-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-[#343A40]">
            Địa chỉ email
            <input
              type="email"
              placeholder="your.email@example.com"
              className="h-12 rounded-lg border border-[#dee2e6] bg-[#F8F9FA] px-3 text-base text-[#343A40] placeholder:text-[#6c757d] focus:border-[#4A6D7C] focus:outline-none focus:ring-2 focus:ring-[#4A6D7C]/30 dark:border-border-dark dark:bg-background-dark dark:text-text-dark"
            />
          </label>
          <button className="mt-2 w-full rounded-lg bg-[#4A6D7C] py-3 font-bold text-white hover:bg-[#3c5562]">
            Gửi Yêu Cầu
          </button>
        </form>
        <div className="mt-6 text-center">
          <a className="text-sm text-[#6c757d] hover:text-[#4A6D7C]" href="/login">
            Quay lại trang Đăng nhập
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

