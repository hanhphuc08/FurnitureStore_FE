import { Link } from 'react-router-dom'
import MainFooter from '../components/layout/MainFooter.jsx'
import MainHeader from '../components/layout/MainHeader.jsx'

const categories = [
  {
    title: 'Phòng Khách',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqIImEikSroIk7df8r9hswXZ420ecsB3k1yY-PbAKXhkJWMfUdDWdq3PMbWaAoszI-cFnjPo5mzEnIZahwtVEuMT9JogsavDMBJwNIvMcA5CQEMbriT4u_LN76jC4EG5zdM9G3BnrRnPWuS0FLE2tGIs4ngXtrtJXF6-nFyAAr1NpqSL2-1ugiLPNk6UGCwO8Fjrk97UXYb2UK2OYspeRTcXtxbUjR1leeXgP7e5UFlxaX-27RpubtgVXkmjmD0CbVzXfwptbBK1pJ',
  },
  {
    title: 'Phòng Ngủ',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2ooeRFKxPcuIzs8wLhoYcv2YXO9mSlQ2jdKLQsl0mmckfgIcE6-bL0LKVD3MyVRCBJGnuI2ft3Y1b4bpM9AyTNhAN5x7IcUqnBHnInsbuEDB1s8sahA4VKkfgOLcwWcaC1wYuvVHPbXcETO5zXBkJfc1obbomzZE39BgSOLWbPhyIp1b9OHiDrYB3xrLEO9jNDo0eM8r8FV1xRsz3KSRuAWHsF5ROXOvM_x-4aXz9QVXi9xb3MwGduIzDyss-b7EyGilErzOiRLph',
  },
  {
    title: 'Bàn Ăn',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfZHJRRQHbTP_4_7tkVFknNJEKSQm_64Ti-bVl-F3Y_wLwZc0gKfk0DHDm5qlvZTQAUmuRFHxuMKeZ_rLPQkTLqDiRuXhh-GQQFNukMWjJDphB6x_z1lyH6c8VVa56rjgU7zHpz7ARaGhf5jFTQvVs_gZsiusUtdKs6dwl-qxOj8nMb4WPXBxknJ6w7lyJzyPmaxJqImV4nnBTkflar2XElg61ixv-UenvOId-3K_n-zAwDbMM8XmdXbPnsKAkVwy2VZ4YxvZJfHez',
  },
  {
    title: 'Đèn Trang Trí',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAb52P6tVYuKxIGIauXalJCTG2sJvQLeuWFpVRs6UGsdwK3z90JK4yJ9s8czc6SJRgs96tv6jh39nSOnSYRvhpqRPabSyGsYdf7D6izfPyrwZ_A7W7Di2ixf8f5TZEiKaBPbFi4FGOYc7xh_MsF4yz-_YBzQGclQ92qy6hI9x3j2ylrNfHAJS3JMVriczS5i6XrFjErhdjmjTDKPc9CNH5ihqWrzTJ1jJceXfwJbnoLhHftLZBoheXM-abcIOMVMPpzdklU82u2vZg',
  },
]

const featuredProducts = [
  {
    name: 'Ghế Gỗ Sồi Tự Nhiên',
    price: '3.500.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIFFg_khzbn7LmERF-EVQh35Ku6SpPoQtA73qzAvltSmEPWp9kOICPX0mhyLnXMfcmpgcvFOQMHjcI1cMJYwZxfotiiHN0k1krNGvgyBVabezhB26kztVczszEZfYoJjAxe-De9WyKuWWb4cWyrgN2CTfLBqasoRuQW8v6_mV3LjLB_yhAeYUeeeKWZGXpbMnmxM8HLmYT61D5U_KYtrT7qyVTZHLlnABCaBRe0q57VW2Arb2tGspqHfXXpAeuYelW1B652IqRGzlX',
  },
  {
    name: 'Giường Ngủ Hiện Đại',
    price: '12.800.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxlQCDxO65VppUVkZM4xnnpc0HAgJQciRdnxNru8JhF-3a6abQ-jDK82Cr-Q5TMD297z7lNBonBl_WzaIoLnAWafX0qQAEpAcmbQVIvuWSuuT2ObN73__sNiXyYELDDSZX9bBsNvodMRbbWZGryrZtiF3N_wX6Lerjji16eXFDQzmDzrk9xPmdxxdklOF7oS8YBdawxfGvGVjOOYuCixCab2Gp-ZNWMwj3oB6b3L8R5gyL--c_0Tlb7_ze5CzkBsgwidtZ49foIRLE',
  },
  {
    name: 'Tủ Trang Trí Vintage',
    price: '7.200.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxJLsvUtThAL3fS3mWi45T7A-yRFWFHAeEyfDUYtxMOaP1Tpi1CENioCx0DdEAFJVTq9H19FgLsTE10F4SMAboiQsyBQ4bnPJoiKXWpCA4F0LY5CRE4QqslAhZigkQD3mqPmZLIbfOxNnMh3t7pweH1CQcIjg4g0JFiGhnUE5i50aO7_BF7OJboJsaUOYVd1oRIiOpnMVepGlTQ3wdbMhfIYZVf6tyChmjBTFZQ0Kg-4XASZYN8VreDhfQ0N8Hb8myR265hLFhEJq',
  },
  {
    name: 'Ghế Bành Vải Nhung',
    price: '5.900.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzTN-m3icJyIxxsI0o5M5VNkFCHX1-faZpx0vrPS-GWbehcmNCjuLemhYgTuGKakZbVjalnHvhbpJZ1Q5pIk66DWtLUBEAoyWxuIfwt8pmJckpqhBNraGVWTkat0IJDFXXLD-PhxQjwk4p2PbC4Qty9quOEnSOnVy5eIO4UPyeEhsZFIwYl7sl0k8b1Op0nHDtfl61fNzpNMohDXhf67QNQOECyfUE9nTbKMmyhy-4rUFk5EgkUs9Xw622p7YJOJJdlYVMRzRXyHB',
  },
]

function HomePage() {
  return (
    <div className="bg-background-light text-text-light min-h-screen font-display dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="flex flex-col">
        <section className="flex justify-center py-5">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex min-h-[60vh] flex-col items-center justify-center gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-6 text-center"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDo42pf-yZOvdtQ2eqPaIdjZQULxkZ3e0_OfdY0rhhbTc7sgg50Wcu0irzXbqd866tWw9su-bhaGncIhwjOmFfHx5a_BpX9w31HaySxYMT1Zy_gxsOkDSMXkkZAryyUuIEBZPXdnqVXCd5weochRIN56ctc5m9UkyG2xjyHzr7awu9v4A7DCh7ZoQ89SzVjX434ZEWf_bN9ZFlzxHwksunt8W8wCpBaISel78tCrgP25nSwnu1VGDkUi-gSh8zPuIteXWZc5I2xmSgX")',
              }}
            >
              <div className="flex max-w-3xl flex-col gap-4">
                <h1 className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
                  Kiến tạo không gian sống trong mơ của bạn
                </h1>
                <p className="text-white/90">
                  Khám phá những thiết kế nội thất tinh tế và hiện đại, mang đến sự khác biệt cho ngôi nhà của bạn.
                </p>
              </div>
              <Link to="/products" className="rounded-lg bg-primary px-6 py-3 font-bold text-text-light transition hover:scale-105">
                Khám Phá Bộ Sưu Tập Mới
              </Link>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">Danh Mục Sản Phẩm</h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {categories.map((category) => (
                  <a key={category.title} className="group relative aspect-[4/5] overflow-hidden rounded-lg" href="#">
                    <div
                      className="flex h-full w-full items-end rounded-lg bg-cover bg-center p-4 text-white transition group-hover:scale-105"
                      style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0)), url("${category.image}")`,
                      }}
                    >
                      <p className="text-lg font-bold">{category.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">Sản Phẩm Nổi Bật</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <div key={product.name} className="group flex flex-col gap-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        alt={product.name}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                        src={product.image}
                      />
                      <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-light opacity-0 transition group-hover:opacity-100">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-text-muted-light">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center py-10 sm:py-16">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 rounded-xl bg-surface-light shadow-sm dark:bg-surface-dark lg:grid-cols-2">
              <div className="order-2 p-8 sm:p-12 lg:order-1">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Không chỉ bán nội thất, chúng tôi cùng bạn tạo nên không gian sống lý tưởng.
                </h2>
                <p className="mt-4 text-text-muted-light">
                  Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cung cấp dịch vụ tư vấn thiết kế chuyên nghiệp,
                  giúp bạn cá nhân hóa không gian sống, tối ưu công năng và chi phí hiệu quả.
                </p>
                <button className="mt-8 rounded-lg bg-primary px-6 py-3 font-bold text-text-light transition hover:scale-105">
                  Nhận Tư Vấn Miễn Phí
                </button>
              </div>
              <div className="order-1 h-64 overflow-hidden rounded-t-xl lg:order-2 lg:h-full lg:rounded-r-xl">
                <img
                  alt="Tư vấn thiết kế"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChVSjDbCjfZM0RSqqyHZGULrU-pUDWJfnWVg8xjz1tjIyxqFcoWyXmp44KuvmwoI_-3TCUYiqiw3tKxxr1O80W1ugJlk0wqao7RWpkvszMGA_e-T7G9_RyEq20PusTGe8ywzUQYhgl-NLFTBYBtLepVfNdpb8cubx5OPQccVz5No2h3vupryIWR4hVtLJ2fAX_Cl7E2aA29gsmYS3CW3t8J4wfSQcW9Kv8nvi_oSY6QguIJ7hSHKfFLgNq0Vh4WT28beQ1arkbwb6G"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  )
}

export default HomePage

