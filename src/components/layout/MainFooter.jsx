const policies = ['Chính sách bảo hành', 'Chính sách đổi trả', 'Chính sách giao hàng', 'Điều khoản dịch vụ']
const aboutLinks = ['Giới thiệu', 'Tuyển dụng', 'Hệ thống cửa hàng', 'Liên hệ']

function MainFooter() {
  return (
    <footer className="mt-16 flex justify-center bg-surface-light text-text-light dark:bg-surface-dark dark:text-text-dark">
      <div className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
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
              <h2 className="text-lg font-bold">Nội Thất Việt</h2>
            </div>
            <p className="text-sm text-text-muted-light">
              Nơi kiến tạo không gian sống đẳng cấp và tinh tế, mang đến những sản phẩm nội thất chất lượng cao và giải pháp thiết kế toàn diện.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Chính Sách</h3>
            <ul className="space-y-2 text-sm text-text-muted-light">
              {policies.map((item) => (
                <li key={item}>
                  <a className="hover:text-primary" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Về Chúng Tôi</h3>
            <ul className="space-y-2 text-sm text-text-muted-light">
              {aboutLinks.map((item) => (
                <li key={item}>
                  <a className="hover:text-primary" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Đăng Ký Nhận Tin</h3>
            <p className="mb-4 text-sm text-text-muted-light">
              Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi đặc biệt.
            </p>
            <div className="flex">
              <input
                className="h-10 flex-1 rounded-l-lg border-none bg-background-light px-3 text-sm text-text-light focus:ring-primary"
                placeholder="Email của bạn"
                type="email"
              />
              <button className="rounded-r-lg bg-primary px-4 font-bold text-text-light">Gửi</button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-black/10 pt-6 text-center text-sm text-text-muted-light dark:border-white/10">
          © 2024 Nội Thất Việt. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default MainFooter

