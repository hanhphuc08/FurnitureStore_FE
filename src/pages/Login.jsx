function LoginPage() {
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
          <form className="mt-8 space-y-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Email hoặc Tên đăng nhập</span>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-text-muted-light">person</span>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
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
                  placeholder="Nhập mật khẩu của bạn"
                  className="h-12 w-full rounded-lg border border-text-muted-light/40 bg-background-light pl-12 pr-12 text-sm placeholder:text-text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-text-dark/30 dark:bg-background-dark"
                />
                <button type="button" className="absolute right-3 text-text-muted-light hover:text-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </label>
            <button className="w-full rounded-lg bg-primary py-3 font-bold text-white hover:bg-primary/90">Đăng nhập</button>
            <div className="relative flex items-center py-2">
              <span className="flex-1 border-t border-text-muted-light/30" />
              <span className="mx-3 text-xs text-text-muted-light">Hoặc tiếp tục với</span>
              <span className="flex-1 border-t border-text-muted-light/30" />
            </div>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-text-muted-light/30 py-3 text-sm font-medium hover:bg-primary/10">
              <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.53 24.55c0-1.63-.13-3.27-.41-4.87H24.24v9.06h13.2c-.55 2.88-2.25 5.43-4.82 7.07v5.86h7.79c4.56-4.2 7.12-10.38 7.12-17.12z" fill="#4285F4" />
                <path d="M24.24 48c6.51 0 11.99-2.16 15.99-5.86l-7.79-5.86c-2.17 1.47-4.96 2.31-8.2 2.31-6.3 0-11.63-4.22-13.53-9.88H2.76v6.2C6.83 42.86 14.81 48 24.24 48z" fill="#34A853" />
                <path d="M10.71 28.71a14.64 14.64 0 0 1-.76-4.71c0-1.64.28-3.23.76-4.71v-6.2H2.76A23.8 23.8 0 0 0 0 24c0 3.9.9 7.57 2.76 10.91l7.95-6.2z" fill="#FBBC05" />
                <path d="M24.24 9.45c3.54 0 6.72 1.24 9.22 3.56l6.88-6.88C36.23 2.28 30.75 0 24.24 0 14.81 0 6.83 5.14 2.76 13.09l7.95 6.2c1.9-5.66 7.23-9.88 13.53-9.88z" fill="#EA4335" />
              </svg>
              Đăng nhập với Google
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-text-muted-light">
            Chưa có tài khoản?{' '}
            <a className="font-medium text-primary hover:underline" href="/register">
              Đăng ký ngay
            </a>
          </p>
        </div>
        <div className="hidden w-1/2 bg-cover bg-center md:block" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZ15Fg4xQ064MulkHxOfsdQ9Z0JKdFT61Oft866hyBJfT7Fxr6ZlQEoE2dcdpI7w8T-yRkyiXIQhukwodNOIi0UDnPmdGhpkffvs9CHG3jBGcCmSdJidki7tYi7AIkTowgdh1RKoiq7EwaQRV5I2_O6Mce6msL9TmQFsMAYiD10vajXzaf-z4ek4b6cUn2bPdoHs_7bXfGY411lkwZkWtbUbw8sFvu-dnuBxozRO4cFCkoPI8YSdyO1Pg8yuBWySf7glCkDB3EDaaw")' }} />
      </div>
    </div>
  )
}

export default LoginPage

