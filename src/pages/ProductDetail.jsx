import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";
import { getProductDetail } from "../api/productApi.js";
import { addToCart } from "../api/cartApi.js";

const fallbackThumbs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIk2wYFE9eyB6bmoh-EgqOpQgizjtB7GfYCluLz3O7YAEA9mK_Ndlk6OCXBLzHSSsSUfta054X7h_t0kyWXuQpHze-qqctsN4VkY81Gr7rOT0jd5PoltZfo0glKCusK4htKm5ZFB8g_pLIwHzQzx6IPD72oY5jKtbcUortm-_21GJbVHW7edKF2tm7DKnN8-zax8qt_9-fe0SF6MPeWHfIDUzKI54GKNF9QGIMn5jIV55uJB7ABWHewrbSSwZGfODlwU6TERBtbWYl",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqQIkFfIeElkaZ4Y75jeP5Kp8Ppkz2Y_My5kQT2vS_yQHoPDtGo9NSiogpunkAEwKZOIPMamKQ5FcWlW1NG7wi23ROzZ6TGsuwPzujGgyFnnuhHW9mufnxD93gk_ECFwhdRbIjdRzQGA1lU7TXe5ptBZjJHr4ux3vpVrDIb-caokwOt1uVg9MQ1rH8LbDxTfg8PQJ7a2tW6neHq8ql8RGKqDmYh7JzK3WPoS0S1XCcye0d5yQNRffXfcqzTdfSemzFYvOhDG8iakQX",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDSNk8s0vwvcWbgY79SQJaINJbBB49MfvzjiU6dVL0HDgC2j4y8-OJ--lizzTJYO-jELRSkDbXBtNkossnLf9Wxs8C1Ne_SC6wReP2IVn77Scd5XawJ7adoYhVUnJrAg9R4UZMBF3hDPcjQK7cp6RY8VNwE1iP-iCOQati8rnaCg4vgnGtctKQWW2sahsuUA6tU1i4wvGvx_8BH1jJE0_G-CInMf1ciB9HsuzqCJj3SET-XgHhCan5R4OC6DoGbCPmF_Wnsvip_6nHM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvCgRQFZroZwGAH8jM9X-EgHGRVQJGgU1X4xX-NexCtmgf9zlaXsE-cBYYOC4VTDyDcl25S35FjAwCV5UdeYrZY2VyNTmcjzj0Hcnv9SgUJr_nRyPoOsGjp2Cww2YOMLMSbmh7Jx917yBRbLHpQRmkiQsh_gWq8A84lAjYq0k2Y2nRUlATDLid4H-h9vIHFPUv89d-N-yBqxYJkTaT5peEgxPSNcWKEpdjPZ-FRtCtphnVRgz7rfsv3Ob-olzFus8jYhaeucO20ekZ",
];

const reviews = [
  {
    name: "An Nguyễn",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ps32jIPk4eOGpXFAsdiwTPY_4YBDmbyqDGNtPfXPPamLvIQurSENxdXBowyhnhpREoGjqUj2LzDyU7di2ZHoCm8QB0WBKiU3qcUlvmjAuCLPNmGR3F-IL0b0E9bJDdJqhsMHJc0yEY0mvyx4lZSMmjTjiP_vNL9kizTCcJj67uiaw0KXjfukR-Hr5OqSiYcyM7f-XiJUyztwXwX3axS7uzipLFTr0YA1J3cwUcgQ7vRgLhkLv6Es9FYGk8IjXAbbqzxJbviy-eB3",
    time: "1 tuần trước",
    rating: 5,
    content:
      "Sofa rất đẹp, chất vải mềm mịn, ngồi êm cực kỳ. Giao hàng nhanh và các bạn lắp đặt cũng rất chuyên nghiệp. Phòng khách nhà mình trông sang hẳn lên.",
  },
  {
    name: "Bình Trần",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoX6fSn4suNYqOho6BzBso4zW7Py1xeVa4cYI8igtOyKX7SGHVQqPexOUQlbuAeXgo9o12jRNykkekCQEqqC1nsVXqNkfEC5EFDyRya8qLlF6CN6zgDYutMGxCi3BtI8KCGhR8OmCjq1K0DE818OCQVGegWdPTHZIrYfyDnJV_7EfnIiO0OT9b4BdKttx1l0odElW65ElwijSo_8KdjYUVOXhpMr4seTmZF0mLx3oFBz6gAlq7FF6yOXE4YP50yB7C1Njvc1Vyp0Si",
    time: "3 tuần trước",
    rating: 4,
    content:
      "Sản phẩm đẹp, giống hình. Tuy nhiên màu trắng kem dễ bám bẩn, cần giữ gìn cẩn thận. Shop nên tư vấn thêm cách vệ sinh vải.",
  },
];

function formatVnd(value) {
  const num = Number(value || 0);
  return num.toLocaleString("vi-VN") + "₫";
}

function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const d = await getProductDetail(slug);
        if (!mounted) return;

        setData(d);
        const firstImg = d?.mainImage || d?.gallery?.[0] || "";
        setActiveImage(firstImg);

        setSelectedColor(0);
        setSelectedSize(0);
        setQty(1);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Không tải được chi tiết sản phẩm");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [slug]);

  const gallery = useMemo(() => {
    if (!data) return fallbackThumbs;
    const list = [];
    if (data.mainImage) list.push(data.mainImage);
    if (Array.isArray(data.gallery)) list.push(...data.gallery);
    return Array.from(new Set(list)).slice(0, 8);
  }, [data]);

  // ===== VARIANTS: items có variantId thật =====
  const variantItems = useMemo(() => data?.variants?.items || [], [data]);

  const colorOptions = useMemo(() => {
    const colors = data?.variants?.colors;
    if (Array.isArray(colors) && colors.length) return colors;
    // fallback nếu BE chưa trả colors: tự build từ items
    const uniq = Array.from(new Set(variantItems.map(v => v.color).filter(Boolean)));
    return uniq.map((name) => ({ name, hex: "#CBD5E1" }));
  }, [data, variantItems]);

  const sizeOptions = useMemo(() => {
    const sizes = data?.variants?.sizes;
    if (Array.isArray(sizes) && sizes.length) return sizes;
    const uniq = Array.from(new Set(variantItems.map(v => v.size).filter(Boolean)));
    return uniq.map((label) => ({ label }));
  }, [data, variantItems]);

  const variantList = useMemo(() => data?.variantList || [], [data]);

  const selectedColorValue = colorOptions?.[selectedColor]?.name || "";
  const selectedSizeValue = sizeOptions?.[selectedSize]?.label || "";

  const selectedVariant = useMemo(() => {
  if (!variantList.length) return null;
  return variantList.find(v =>
    String(v.color || "").toLowerCase() === String(selectedColorValue).toLowerCase() &&
    String(v.size || "").toLowerCase() === String(selectedSizeValue).toLowerCase()
  ) || null;
}, [variantList, selectedColorValue, selectedSizeValue]);

  const displayPrice = useMemo(() => {
    // ưu tiên giá variant
    if (selectedVariant?.price != null) return selectedVariant.price;
    return data?.price ?? 0;
  }, [data, selectedVariant]);

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }
  function inc() {
    setQty((q) => Math.min(99, q + 1));
  }

  async function handleAddToCart() {
    if (!data?.id) return;

    try {
      setAdding(true);
      await addToCart({
        productId: data.id,
        variantId: selectedVariant?.variantId ?? null,
        quantity: qty,
      });
      navigate("/cart");
    } catch (e) {
      if (e.message === "UNAUTHORIZED") navigate("/login");
      else alert(e.message || "Không thêm được vào giỏ");
    } finally {
      setAdding(false);
    }
  }

  const related = data?.relatedProducts || [];

  const rating = data?.rating ?? 4.8;
  const reviewCount = data?.reviewCount ?? 125;

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
          <span className="font-medium text-[#333333] dark:text-text-dark">
            {loading ? "Đang tải..." : data?.name || "Chi tiết sản phẩm"}
          </span>
        </nav>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT: GALLERY */}
          <div className="flex flex-col gap-4">
            <div
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cover bg-center shadow-sm"
              style={{
                backgroundImage: `url("${activeImage || gallery[0]}")`,
              }}
            >
              <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {(loading ? fallbackThumbs : gallery).slice(0, 4).map((thumb, index) => (
                <button
                  key={thumb + index}
                  type="button"
                  onClick={() => setActiveImage(thumb)}
                  className={`aspect-square rounded-lg bg-cover bg-center ring-2 ${
                    (activeImage || gallery[0]) === thumb ? "ring-[#556B2F]" : "opacity-70 hover:opacity-100 ring-transparent"
                  }`}
                  style={{ backgroundImage: `url("${thumb}")` }}
                  aria-label={`thumb-${index}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
            <div>
              <h1 className="text-4xl font-black text-[#333333] dark:text-text-dark">
                {loading ? "Đang tải..." : data?.name}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                SKU: {data?.sku || "N/A"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
                  <span
                    key={idx}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                {rating % 1 >= 0.5 ? (
                  <span className="material-symbols-outlined">star_half</span>
                ) : null}
              </div>
              <p className="text-sm text-gray-600">({reviewCount} đánh giá)</p>
            </div>

            <div>
              <span className="text-4xl font-bold text-[#556B2F]">
                {formatVnd(displayPrice)}
              </span>
              {data?.originalPrice ? (
                <span className="ml-3 text-xl text-gray-400 line-through">
                  {formatVnd(data.originalPrice)}
                </span>
              ) : null}
            </div>

            <div className="space-y-4 border-y border-gray-200 py-6 dark:border-gray-700">
              {/* COLOR */}
              <div>
                <p className="font-semibold">
                  Màu sắc:{" "}
                  <span className="font-normal text-gray-600">
                    {colorOptions?.[selectedColor]?.name || "—"}
                  </span>
                </p>
                <div className="mt-3 flex gap-3">
                  {colorOptions.map((c, index) => (
                    <button
                      key={c.hex + index}
                      type="button"
                      onClick={() => setSelectedColor(index)}
                      className={`size-8 rounded-full ${
                        index === selectedColor
                          ? "ring-2 ring-[#556B2F] ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div>
                <p className="font-semibold">Kích thước</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {sizeOptions.map((s, index) => (
                    <button
                      key={s.label + index}
                      type="button"
                      onClick={() => setSelectedSize(index)}
                      className={`rounded-lg border px-4 py-2 ${
                        index === selectedSize
                          ? "border-[#556B2F] bg-[#556B2F]/10 text-[#556B2F]"
                          : "border-gray-300 hover:bg-gray-100 dark:border-gray-600"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* QTY + ADD TO CART */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  onClick={dec}
                  className="px-4 py-2 text-xl text-gray-500 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  className="w-12 border-x border-gray-300 text-center"
                  type="text"
                  value={qty}
                  readOnly
                />
                <button
                  type="button"
                  onClick={inc}
                  className="px-4 py-2 text-xl text-gray-500 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={adding || loading || !data?.id}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#556B2F] py-3 font-bold text-white hover:bg-[#445525] disabled:opacity-60"
                onClick={handleAddToCart}
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                {adding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>


              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300"
                title="Yêu thích"
              >
                <span className="material-symbols-outlined text-red-500">
                  favorite_border
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
              <span className="material-symbols-outlined text-[#556B2F]">
                local_shipping
              </span>
              Dự kiến giao hàng trong <span className="font-bold">3-5 ngày</span>.{" "}
              <a className="underline hover:text-[#556B2F]" href="#">
                Xem chính sách
              </a>
            </div>
          </div>
        </div>

        {/* DESCRIPTION / SPECS */}
        <section className="mt-16 border-b border-gray-200 pb-8 dark:border-gray-700">
          <nav className="-mb-px flex gap-6 text-sm font-medium">
            <a className="border-b-2 border-[#556B2F] pb-3 text-[#556B2F]" href="#">
              Mô tả chi tiết
            </a>
            <a className="pb-3 text-gray-500" href="#">
              Thông số kỹ thuật
            </a>
            <a className="pb-3 text-gray-500" href="#reviews">
              Đánh giá của khách hàng ({reviewCount})
            </a>
          </nav>

          <div className="prose mt-8 max-w-none text-gray-700">
            {/* ưu tiên dùng description từ BE; nếu description là text thường thì vẫn render ổn */}
            {data?.description ? (
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            ) : (
              <>
                <h3>Nguồn cảm hứng thiết kế</h3>
                <p>
                  Lấy cảm hứng từ phong cách Japandi tối giản và ấm cúng, sản phẩm
                  mang đến sự sang trọng tinh tế và cảm giác thoải mái tuyệt đối.
                </p>
              </>
            )}

            {/* specs map (nếu BE có) */}
            {data?.specs ? (
              <>
                <h3>Vật liệu &amp; Công năng</h3>
                <ul>
                  {Object.entries(data.specs).map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>

        {/* REVIEWS (tạm giữ hardcode) */}
        <section className="mt-12" id="reviews">
          <h2 className="text-3xl font-bold">Đánh giá từ khách hàng</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center dark:bg-white/5">
              <p className="text-5xl font-black text-[#556B2F]">
                {Number(rating).toFixed(1)}
              </p>
              <div className="my-2 flex text-yellow-500">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-2xl">star_half</span>
              </div>
              <p className="text-sm text-gray-500">Dựa trên {reviewCount} đánh giá</p>
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
            <h3 className="text-xl font-bold">Hiển thị {reviews.length} trên {reviewCount} đánh giá</h3>
            <button className="rounded-lg bg-[#556B2F] px-4 py-2 text-sm font-medium text-white hover:bg-[#445525]">
              Viết đánh giá của bạn
            </button>
          </div>

          <div className="mt-6 space-y-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="flex flex-col gap-6 border-b border-gray-200 pb-6 dark:border-gray-700 sm:flex-row"
              >
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
                        <span
                          key={idx}
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
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

        {/* RELATED */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Sản phẩm liên quan</h2>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow-sm dark:bg-surface-dark">
                  <div className="aspect-[4/3] animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                  <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                  <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id || p.slug}
                  to={`/products/${p.slug}`}
                  className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-surface-dark"
                >
                  <div
                    className="aspect-[4/3] rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${
                        p.image ||
                        "https://images.unsplash.com/photo-1582582621959-48d27397dc04?auto=format&fit=crop&w=900&q=80"
                      }")`,
                    }}
                  />
                  <h3 className="font-semibold hover:text-[#556B2F]">{p.name}</h3>
                  <p className="font-bold text-[#556B2F]">{formatVnd(p.price)}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <MainFooter />
    </div>
  );
}

export default ProductDetailPage;
