import { Link } from 'react-router-dom'
import MainFooter from '../components/layout/MainFooter.jsx'
import MainHeader from '../components/layout/MainHeader.jsx'

const galleryThumbnails = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBIk2wYFE9eyB6bmoh-EgqOpQgizjtB7GfYCluLz3O7YAEA9mK_Ndlk6OCXBLzHSSsSUfta054X7h_t0kyWXuQpHze-qqctsN4VkY81Gr7rOT0jd5PoltZfo0glKCusK4htKm5ZFB8g_pLIwHzQzx6IPD72oY5jKtbcUortm-_21GJbVHW7edKF2tm7DKnN8-zax8qt_9-fe0SF6MPeWHfIDUzKI54GKNF9QGIMn5jIV55uJB7ABWHewrbSSwZGfODlwU6TERBtbWYl',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBqQIkFfIeElkaZ4Y75jeP5Kp8Ppkz2Y_My5kQT2vS_yQHoPDtGo9NSiogpunkAEwKZOIPMamKQ5FcWlW1NG7wi23ROzZ6TGsuwPzujGgyFnnuhHW9mufnxD93gk_ECFwhdRbIjdRzQGA1lU7TXe5ptBZjJHr4ux3vpVrDIb-caokwOt1uVg9MQ1rH8LbDxTfg8PQJ7a2tW6neHq8ql8RGKqDmYh7JzK3WPoS0S1XCcye0d5yQNRffXfcqzTdfSemzFYvOhDG8iakQX',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSNk8s0vwvcWbgY79SQJaINJbBB49MfvzjiU6dVL0HDgC2j4y8-OJ--lizzTJYO-jELRSkDbXBtNkossnLf9Wxs8C1Ne_SC6wReP2IVn77Scd5XawJ7adoYhVUnJrAg9R4UZMBF3hDPcjQK7cp6RY8VNwE1iP-iCOQati8rnaCg4vgnGtctKQWW2sahsuUA6tU1i4wvGvx_8BH1jJE0_G-CInMf1ciB9HsuzqCJj3SET-XgHhCan5R4OC6DoGbCPmF_Wnsvip_6nHM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBvCgRQFZroZwGAH8jM9X-EgHGRVQJGgU1X4xX-NexCtmgf9zlaXsE-cBYYOC4VTDyDcl25S35FjAwCV5UdeYrZY2VyNTmcjzj0Hcnv9SgUJr_nRyPoOsGjp2Cww2YOMLMSbmh7Jx917yBRbLHpQRmkiQsh_gWq8A84lAjYq0k2Y2nRUlATDLid4H-h9vIHFPUv89d-N-yBqxYJkTaT5peEgxPSNcWKEpdjPZ-FRtCtphnVRgz7rfsv3Ob-olzFus8jYhaeucO20ekZ',
]

const relatedProducts = [
  {
    name: 'Bàn Trà Gỗ Sồi',
    price: '3.200.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMi3e6Eq7mKRdbdTlqDYASu4IUFjfkwNHqQOBNFW-6M__eTQxVaEsQQVLQHmhdKgN4dufvNqtC4iHjGpqPasuwk70WR5wmOurPZfp_iFL6ipUxsCaUSzIdChClgBvdI96zsazh6dkJ9zn3KwLWg3UhDfDhU4ESW5bcMzCSr0RAijD307dY7-XGO6H8bUqnw17_oVIxZGSN2KDLc3-y6ec68ZW5Jjr_igMUcFcdPa9NdZfbbumQW16iao3EtsSQ-FJIoWchY6jzafXD',
  },
  {
    name: 'Đèn Sàn Hiện Đại',
    price: '1.850.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWKm2lcAYr1b2J1VIVQ4gA4EQ5hE6sSB5naqRq9CqRE1o4RAO82i2IjLwiQUS4kpgR_4XwGSWsu-ejXKVSBhS1tzES1o0NJLlC9BGj_DNrGFpWtgnmyvcBabxt0Cs75UqReYlpsmu8rjUHApDhEC0-qiSAV1DWEsZKPGWEWZhtnFzi0z388jBmcX0ZpbxFV7wygskMp6zvoiyw1DAs9N0D6-J4jX6-gEbWuuYAwR2fTx2fyaavDZr7q5fkHPjjkZvWszFff8-Bgj1L',
  },
  {
    name: 'Thảm Trải Sàn Lông Cừu',
    price: '4.500.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-0ARRpLuv-UM4a9Ob4NehiKNTHF_dsTT4Jks-pNsiEEHqqg53eJ9EjtBY6aKOKjndEJBIY5EbwetMQBt83-2yVoChILohkZfvQJObghoec2qmrusVmbGr3Mzrj700VxMuR2p-RwdiBxKm_WAvqYmc_LDaHOsxGo_VGk6IXdmlVOhK56sNaM5MaKpV8f6SqYBx3l6s4L236QKL3bJGjoyFAfSCs2UthMsiQSr6I3D9moC_MG4AABz3SAph5PSkUn1quMIYw2S_p1G6',
  },
  {
    name: 'Ghế Bành Vải Nhung',
    price: '5.100.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3A8W6Um1zrfzjhRYd2iFeWl3NvnuRMeboGDg-E2UlIXVyz4q9-Lsi9eKgjwBDOP896-7nkmFHQiojc6I9pKfp3D8Djlv_ey1oMz1838AIn-qUjaquGGSmiE5ILITto1mABs8Tnay7guWDicQ-kpZZHnjoFty1WKG5lv3BzIXRIxWeqzx7Mt9fAbvzp-Ms9aJdd9HsqruV5hZVw8osO4C95DHwGvso4mbhfXAlMR38lDIW3eKvfOqt6HSGVIhllH6T945u9EqgDiC',
  },
]

const reviews = [
  {
    name: 'An Nguyễn',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ps32jIPk4eOGpXFAsdiwTPY_4YBDmbyqDGNtPfXPPamLvIQurSENxdXBowyhnhpREoGjqUj2LzDyU7di2ZHoCm8QB0WBKiU3qcUlvmjAuCLPNmGR3F-IL0b0E9bJDdJqhsMHJc0yEY0mvyx4lZSMmjTjiP_vNL9kizTCcJj67uiaw0KXjfukR-Hr5OqSiYcyM7f-XiJUyztwXwX3axS7uzipLFTr0YA1J3cwUcgQ7vRgLhkLv6Es9FYGk8IjXAbbqzxJbviy-eB3',
    time: '1 tuần trước',
    rating: 5,
    content:
      'Sofa rất đẹp, chất vải mềm mịn, ngồi êm cực kỳ. Giao hàng nhanh và các bạn lắp đặt cũng rất chuyên nghiệp. Phòng khách nhà mình trông sang hẳn lên.',
  },
  {
    name: 'Bình Trần',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoX6fSn4suNYqOho6BzBso4zW7Py1xeVa4cYI8igtOyKX7SGHVQqPexOUQlbuAeXgo9o12jRNykkekCQEqqC1nsVXqNkfEC5EFDyRya8qLlF6CN6zgDYutMGxCi3BtI8KCGhR8OmCjq1K0DE818OCQVGegWdPTHZIrYfyDnJV_7EfnIiO0OT9b4BdKttx1l0odElW65ElwijSo_8KdjYUVOXhpMr4seTmZF0mLx3oFBz6gAlq7FF6yOXE4YP50yB7C1Njvc1Vyp0Si',
    time: '3 tuần trước',
    rating: 4,
    content: 'Sản phẩm đẹp, giống hình. Tuy nhiên màu trắng kem dễ bám bẩn, cần giữ gìn cẩn thận. Shop nên tư vấn thêm cách vệ sinh vải.',
  },
]

function ProductDetailPage() {
  return (
    <div className="bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-gray-500">
          <Link className="text-primary hover:underline" to="/">
            Trang chủ
          </Link>
          <span>/</span>
          <Link className="text-primary hover:underline" to="/products">
            Sản phẩm
          </Link>
          <span>/</span>
          <span className="font-medium text-[#333333] dark:text-text-dark">Sofa Vải Lông Cừu Sang Trọng</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDi0eAueAGesMDKqqFOIus46QhtVN_1yTXTViBglU87ywzpqZ4J-ztYaFA8nZlSRyYzR3PcknS2NPF5NTvSjBYtmkJ_jTaUggJDGdTNQrEMfPA2CL8HuQz9kIkSmnNslqGvcujOakScuFnT47k_kbxqy9j4Dgm_gWN5zm-na8koz9TjIYNt_MKiDYlF5OnEsmkkA_n449VvdKhygAIJ-afUdBU_6ltMid3SylC4kHQJ86MXcI8Rxa-x8_ezCWXRN3AXYU-e97LhlUay")',
              }}
            >
              <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {galleryThumbnails.map((thumb, index) => (
                <div
                  key={thumb}
                  className={`aspect-square rounded-lg bg-cover bg-center ring-2 ${
                    index === 0 ? 'ring-[#556B2F]' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundImage: `url("${thumb}")` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
            <div>
              <h1 className="text-4xl font-black text-[#333333] dark:text-text-dark">Sofa Vải Lông Cừu Sang Trọng</h1>
              <p className="mt-2 text-sm text-gray-500">SKU: SF-BC-2024</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <span key={idx} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined">star_half</span>
              </div>
              <p className="text-sm text-gray-600">(125 đánh giá)</p>
            </div>
            <div>
              <span className="text-4xl font-bold text-[#556B2F]">12.500.000₫</span>
              <span className="ml-3 text-xl text-gray-400 line-through">15.000.000₫</span>
            </div>
            <div className="space-y-4 border-y border-gray-200 py-6 dark:border-gray-700">
              <div>
                <p className="font-semibold">
                  Màu sắc: <span className="font-normal text-gray-600">Trắng Kem</span>
                </p>
                <div className="mt-3 flex gap-3">
                  {['#F5F5DC', '#D2B48C', '#808080'].map((color, index) => (
                    <button
                      key={color}
                      className={`size-8 rounded-full ${index === 0 ? 'ring-2 ring-[#556B2F] ring-offset-2' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold">Kích thước</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {['1.6m x 2.0m', '1.8m x 2.0m', '2.0m x 2.2m'].map((size, index) => (
                    <button
                      key={size}
                      className={`rounded-lg border px-4 py-2 ${
                        index === 0
                          ? 'border-[#556B2F] bg-[#556B2F]/10 text-[#556B2F]'
                          : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button className="px-4 py-2 text-xl text-gray-500 hover:bg-gray-100">-</button>
                <input className="w-12 border-x border-gray-300 text-center" type="text" defaultValue="1" />
                <button className="px-4 py-2 text-xl text-gray-500 hover:bg-gray-100">+</button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#556B2F] py-3 font-bold text-white hover:bg-[#445525]">
                <span className="material-symbols-outlined">shopping_bag</span>
                Thêm vào giỏ hàng
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300">
                <span className="material-symbols-outlined text-red-500">favorite_border</span>
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
              <span className="material-symbols-outlined text-[#556B2F]">local_shipping</span>
              Dự kiến giao hàng trong <span className="font-bold">3-5 ngày</span>.{' '}
              <a className="underline hover:text-[#556B2F]" href="#">
                Xem chính sách
              </a>
            </div>
          </div>
        </div>

        <section className="mt-16 border-b border-gray-200 pb-8 dark:border-gray-700">
          <nav className="-mb-px flex gap-6 text-sm font-medium">
            <a className="border-b-2 border-[#556B2F] pb-3 text-[#556B2F]" href="#">
              Mô tả chi tiết
            </a>
            <a className="pb-3 text-gray-500" href="#">
              Thông số kỹ thuật
            </a>
            <a className="pb-3 text-gray-500" href="#">
              Đánh giá của khách hàng (125)
            </a>
          </nav>
          <div className="prose mt-8 max-w-none text-gray-700">
            <h3>Nguồn cảm hứng thiết kế</h3>
            <p>
              Lấy cảm hứng từ phong cách Japandi tối giản và ấm cúng, Sofa Vải Lông Cừu là sự kết hợp hoàn hảo giữa sự
              sang trọng tinh tế và cảm giác thoải mái tuyệt đối.
            </p>
            <h3>Vật liệu &amp; Công năng</h3>
            <p>
              Sản phẩm được chế tác từ vật liệu bền vững, thân thiện với môi trường. Vải lông cừu bouclé mang lại vẻ
              ngoài độc đáo và êm ái khi tiếp xúc.
            </p>
            <ul>
              <li>Chất liệu bọc: Vải Bouclé nhập khẩu</li>
              <li>Khung: Gỗ sồi tự nhiên</li>
              <li>Đệm: Mút D40 kết hợp lò xo túi</li>
              <li>Chân ghế: Gỗ sồi sơn phủ mờ</li>
            </ul>
          </div>
        </section>

        <section className="mt-12" id="reviews">
          <h2 className="text-3xl font-bold">Đánh giá từ khách hàng</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center dark:bg-white/5">
              <p className="text-5xl font-black text-[#556B2F]">4.8</p>
              <div className="my-2 flex text-yellow-500">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <span key={idx} className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-2xl">star_half</span>
              </div>
              <p className="text-sm text-gray-500">Dựa trên 125 đánh giá</p>
            </div>
            <div className="md:col-span-2 space-y-2 text-sm text-gray-600">
              {[85, 10, 4, 1, 0].map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-12">{5 - index} sao</span>
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-yellow-400" style={{ width: `${value}%` }} />
                  </div>
                  <span className="w-10 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-xl font-bold">Hiển thị 3 trên 125 đánh giá</h3>
            <button className="rounded-lg bg-[#556B2F] px-4 py-2 text-sm font-medium text-white hover:bg-[#445525]">
              Viết đánh giá của bạn
            </button>
          </div>
          <div className="mt-6 space-y-8">
            {reviews.map((review) => (
              <div key={review.name} className="flex flex-col gap-6 border-b border-gray-200 pb-6 dark:border-gray-700 sm:flex-row">
                <div className="flex flex-col items-center text-center sm:w-32">
                  <div
                    className="h-16 w-16 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${review.avatar}")` }}
                  />
                  <p className="mt-2 font-semibold">{review.name}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <span key={idx} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{review.time}</p>
                  </div>
                  <p className="mt-2 text-lg font-semibold">Tuyệt vời, vượt ngoài mong đợi!</p>
                  <p className="mt-2 text-gray-600">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Sản phẩm liên quan</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <div key={product.name} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-surface-dark">
                <div
                  className="aspect-[4/3] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url("${product.image}")` }}
                />
                <h3 className="font-semibold hover:text-[#556B2F]">{product.name}</h3>
                <p className="font-bold text-[#556B2F]">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  )
}

export default ProductDetailPage

