import { Link } from 'react-router-dom'
import MainFooter from '../components/layout/MainFooter.jsx'
import MainHeader from '../components/layout/MainHeader.jsx'

const processSteps = [
  { title: 'Khảo Sát & Tư Vấn', desc: 'Lắng nghe nhu cầu, khảo sát hiện trạng và tư vấn sơ bộ về ý tưởng và ngân sách.' },
  { title: 'Thiết Kế 2D/3D', desc: 'Lên bản vẽ công năng và phối cảnh trực quan để bạn hình dung rõ nhất.' },
  { title: 'Thi Công & Sản Xuất', desc: 'Triển khai thi công phần thô và sản xuất đồ nội thất theo thiết kế.' },
  { title: 'Bàn Giao & Bảo Hành', desc: 'Nghiệm thu công trình và cung cấp chính sách bảo hành uy tín.' },
]

const portfolioProjects = [
  { name: 'Dự án The Sapphire', location: 'Quận 2, TP. HCM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2daWof0rnKljVdfeyjVWczAndGTX8PWLURZ5m5Kq6-vUkAxP3Rs7_jTwbOf7hi6bJX_J18bZYG6Q5WDwDKjNY5soEzFDOb2dIyy1YSxqGaEsPJxmK5mP-RUVgR1DP2lCbCh0YVm5MavjAOqBvYao8Pg0-9jKP_1zWPeQZLKvKrKMyREYBFMgCIp8kODysoToTIl6aATonWUNoYolLiK5oEqe3ZJ2J8oSEaX8R-AV7TxVoYp-bePWAihO0u6toowI-lfAjF4QEYaJH' },
  { name: 'Biệt thự An Phú', location: 'Quận 7, TP. HCM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBMROkbBLquHW5eWbonHGzIyPcRwCJ3Y-wqc5Go0Jd0fxq2nhcMvJhp5lxXD-nSw_2CpqlVMcrXavxM2mhhfCicDklVjAYuNbja0SJLRx8JQocqTek9u3btztjXHfEjQko5pHU_M0XSXhlA7cm7aPTv1kZYZu1FRBlFW2v2oHTb4pH1aSNIXQOmJPLzmRsgO4W1sHBli_IoZfS5OtQsCFfHO4IyjuJyAZ9dzOUQL0Bu98un-XmfLAfgrYUARbmPgfIN9W_fP27sNtx' },
  { name: 'Văn phòng TechHub', location: 'Quận 1, TP. HCM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAogummUUPHbN-cjl3RjagrpHOgQlJ9YKJ051xOfThG4mnJaIqHaWVHpnyYmfD_S1EOY3Pd23t2MIfYkpuOc0qTrI91-MUdTiKVx53qmYrRexOxSCCLPsoYmsA37t-ZRJLMNqbucL_F-jeNGaaxHQeWyfTkGjs_eG13e_xYxlnk4ay4kcJOsZ7h2dVZGqGwe34lPvpU7oLj6vn1cPt0anVKlKBZKJHpOnhfJd4o1wqEzDi7xGGKSWsq2Y4oZ8LxFpyl6ondiMl0VSxP' },
  { name: 'Căn hộ Penthouse', location: 'Bình Thạnh, TP. HCM', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq9mEcSz0j9ULERiC21K4wz7NbRpStEvUVOqrh-L-RtjFYLwX5Iq4TtRk1peAPYRSr_2u6X3H7xR3j_JBeX8olAJNPb-YtTVBKCn9RPKkw4yhsuBUyoM4LLyVLf5LRRG_SSxpxg1V6gzqvSScUlK92ZLB9mlIqfjTxOxq4gfTZJQaPuD19FBIoIUVsE1zCN5RZi_3M2J_VBuDC95f7bMBu5QP1Oz9PYgJtbvBOxbaqpihkwNMKZXAxtK9Pwo8FzegqI8dmzuHmkOiq' },
]

function ConsultingPage() {
  return (
    <div className="bg-background-light text-[#0d1b1b] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-10 sm:px-10 md:px-20">
        <section
          className="min-h-[420px] rounded-xl bg-cover bg-center p-8 text-white"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDE4K7QagsPO3nhQUsA5oV_dGUgnnpBFooS76hmrIHzq9VCt6nbKSkXuaa9ipskRp__P_lFeETRJHsufplcob_8-d_7H-ryZ10KB7sXLl0JjjHILczDtwyq6SsvFy3WmGPlHA1I021nNg_lM3clGX5BuPBKXFUxMl5ugwOWDtmy1K_TDETjJH_KDbU7sOo0OVOkraKBiC42aTSJUBSPcg6SOvj74WFB7c577tehYWNiuJwLQ45kZxJfS4aXMWKcczQEEd3_NIywg-md")',
          }}
        >
          <div className="max-w-xl space-y-3">
            <p className="text-sm">Dịch vụ tư vấn thiết kế</p>
            <h1 className="text-4xl font-black">Biến Ngôi Nhà Mơ Ước Thành Hiện Thực</h1>
            <p>
              Chúng tôi cung cấp các giải pháp tư vấn thiết kế nội thất chuyên nghiệp, giúp bạn kiến tạo không gian sống lý tưởng và đậm chất riêng.
            </p>
            <Link
              to="/consulting"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-background-dark hover:bg-primary/90"
            >
              Đặt Lịch Tư Vấn Ngay
            </Link>
          </div>
        </section>

        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold">Tại Sao Chọn Dịch Vụ Của Chúng Tôi?</h2>
          <p className="text-text-muted-light">
            Chúng tôi mang đến những giá trị vượt trội, đảm bảo sự hài lòng tuyệt đối cho mọi khách hàng.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: 'timer', title: 'Tiết Kiệm Thời Gian', desc: 'Chúng tôi lo liệu mọi thứ từ khâu ý tưởng đến thi công.' },
              { icon: 'space_dashboard', title: 'Tối Ưu Không Gian', desc: 'Giải pháp thiết kế thông minh cho mọi mét vuông.' },
              { icon: 'palette', title: 'Phong Cách Cá Nhân Hóa', desc: 'Thiết kế phản ánh đúng phong cách của bạn.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-primary/20 bg-white p-5 text-center dark:bg-background-dark">
                <span className="material-symbols-outlined text-4xl text-primary">{feature.icon}</span>
                <h3 className="mt-3 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-text-muted-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-center text-3xl font-bold">Quy Trình Làm Việc Đơn Giản</h2>
          <div className="grid gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{`filter_${index + 1}`}</span>
                  {index < processSteps.length - 1 && <div className="h-full w-px bg-primary/30" />}
                </div>
                <div>
                  <p className="text-sm text-text-muted-light">Bước {index + 1}</p>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-text-muted-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-center text-3xl font-bold">Dự Án Tiêu Biểu</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {portfolioProjects.map((project) => (
              <div key={project.name} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-background-dark">
                <div
                  className="aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url("${project.image}")` }}
                />
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-text-muted-light">{project.location}</p>
                </div>
                <button className="rounded-lg border border-primary/30 py-2 text-sm font-bold text-primary hover:bg-primary/10">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-primary/20 bg-white p-8 shadow-sm dark:bg-background-dark">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Nhận Tư Vấn Miễn Phí</h2>
            <p className="text-text-muted-light">Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ sớm nhất.</p>
          </div>
          <form className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { id: 'name', label: 'Họ và Tên', placeholder: 'Nguyễn Văn A' },
              { id: 'phone', label: 'Số Điện Thoại', placeholder: '090 xxx xxxx' },
              { id: 'email', label: 'Email', placeholder: 'email@example.com', span: 2 },
              { id: 'service', label: 'Dịch Vụ Quan Tâm', placeholder: 'Tư vấn thiết kế căn hộ', span: 2 },
            ].map((field) => (
              <label key={field.id} className={`flex flex-col ${field.span === 2 ? 'md:col-span-2' : ''}`}>
                <span className="mb-1 text-sm font-medium">{field.label}</span>
                {field.id === 'service' ? (
                  <select className="rounded-lg border border-primary/30 px-3 py-2 focus:border-primary focus:ring-primary/40">
                    <option>Tư vấn thiết kế căn hộ</option>
                    <option>Tư vấn thiết kế nhà phố/biệt thự</option>
                    <option>Thiết kế văn phòng</option>
                    <option>Khác</option>
                  </select>
                ) : (
                  <input
                    id={field.id}
                    placeholder={field.placeholder}
                    className="rounded-lg border border-primary/30 px-3 py-2 focus:border-primary focus:ring-primary/40"
                  />
                )}
              </label>
            ))}
            <label className="md:col-span-2">
              <span className="mb-1 block text-sm font-medium">Lời nhắn</span>
              <textarea
                rows={4}
                placeholder="Hãy cho chúng tôi biết thêm về yêu cầu của bạn..."
                className="w-full rounded-lg border border-primary/30 px-3 py-2 focus:border-primary focus:ring-primary/40"
              />
            </label>
            <div className="md:col-span-2 text-center">
              <button className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-background-dark hover:bg-primary/90">
                Gửi Yêu Cầu
              </button>
            </div>
          </form>
        </section>
      </main>
      <MainFooter />
    </div>
  )
}

export default ConsultingPage

