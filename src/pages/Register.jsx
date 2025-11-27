function RegisterPage() {
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
          <form className="space-y-6">
            {[
              { label: 'Họ và Tên', type: 'text', id: 'full-name', placeholder: 'Nhập họ và tên của bạn' },
              { label: 'Email', type: 'email', id: 'email', placeholder: 'nguyenvana@email.com' },
            ].map((field) => (
              <div key={field.id} className="flex flex-col">
                <label htmlFor={field.id} className="pb-2 text-base font-medium">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-14 rounded-lg border border-text-muted-light/40 bg-background-light px-4 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label htmlFor="password" className="pb-2 text-base font-medium">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
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
                className="h-14 rounded-lg border border-text-muted-light/40 bg-background-light px-4 text-base placeholder:text-text-muted-light focus:border-primary focus:ring-1 focus:ring-primary dark:border-text-dark/40 dark:bg-background-dark"
              />
              <p className="mt-2 text-sm text-[#DC3545]">Mật khẩu không khớp.</p>
            </div>
            <button type="submit" className="h-14 w-full rounded-lg bg-primary text-base font-bold text-text-light hover:opacity-90">
              Tạo Tài Khoản
            </button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-text-muted-light/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background-light px-2 text-text-muted-light dark:bg-background-dark">
                Hoặc đăng ký với
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Google', 'Facebook'].map((provider) => (
              <button
                key={provider}
                className="flex h-12 items-center justify-center gap-3 rounded-lg border border-text-muted-light/40 bg-background-light text-sm font-medium text-text-light hover:bg-primary/10 dark:border-text-dark/40 dark:bg-background-dark"
              >
                <span className="material-symbols-outlined text-primary">{provider === 'Google' ? 'globe' : 'facebook'}</span>
                {provider}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted-light">
            Bằng việc đăng ký, bạn đồng ý với{' '}
            <a className="font-medium text-primary hover:underline" href="#">
              Điều khoản Dịch vụ
            </a>{' '}
            và{' '}
            <a className="font-medium text-primary hover:underline" href="#">
              Chính sách Bảo mật
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

