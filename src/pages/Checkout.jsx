import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";
import { getMyCart } from "../api/cartApi.js";
import { checkout, previewCheckout } from "../api/checkoutApi.js";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

// Convert technical error messages to user-friendly messages
const getFriendlyErrorMessage = (errorMessage) => {
  const message = errorMessage?.toUpperCase() || "";

  switch (message) {
    case "EMPTY_ITEMS":
      return "Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.";
    case "MISSING_SHIPPING_INFO":
      return "Thiếu thông tin giao hàng. Vui lòng điền đầy đủ thông tin.";
    case "MISSING_FULLNAME":
      return "Vui lòng nhập họ và tên người nhận.";
    case "MISSING_PHONE":
      return "Vui lòng nhập số điện thoại liên hệ.";
    case "MISSING_ADDRESS":
      return "Vui lòng nhập địa chỉ giao hàng.";
    case "MISSING_CITY":
      return "Vui lòng chọn tỉnh/thành phố.";
    case "INVALID_QTY":
      return "Số lượng sản phẩm không hợp lệ.";
    case "OUT_OF_STOCK_VARIANT":
      return "Một số sản phẩm đã hết hàng. Vui lòng kiểm tra lại giỏ hàng.";
    case "OUT_OF_STOCK_PRODUCT":
      return "Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.";
    case "CART_NOT_FOUND":
      return "Không tìm thấy giỏ hàng. Vui lòng thử lại.";
    case "FORBIDDEN":
      return "Bạn không có quyền thực hiện thao tác này.";
    case "PROMO_NOT_FOUND":
      return "Mã giảm giá không tồn tại.";
    case "PROMO_INACTIVE":
      return "Mã giảm giá đã bị vô hiệu hóa.";
    case "PROMO_EXPIRED":
      return "Mã giảm giá đã hết hạn sử dụng.";
    case "PROMO_MIN_NOT_MET":
      return "Đơn hàng chưa đạt giá trị tối thiểu để áp dụng mã giảm giá.";
    case "PROMO_USAGE_LIMIT":
      return "Mã giảm giá đã đạt giới hạn sử dụng.";
    case "PROMO_RACE_CONDITION":
      return "Mã giảm giá đã được sử dụng hết. Vui lòng thử lại.";
    case "UNAUTHORIZED":
      return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
    default:
      return errorMessage || "Có lỗi xảy ra. Vui lòng thử lại sau.";
  }
};

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ===== Selected items from Cart page =====
  const selectedItems = useMemo(
    () => location.state?.selectedItems || [],
    [location.state?.selectedItems]
  );

  // ===== Base states =====
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===== Form states =====
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ===== Promotion states =====
  const [promotionCode, setPromotionCode] = useState("");
  const [preview, setPreview] = useState(null); 
  // preview = { subtotal, discount, shippingFee, total }

  // =====================================================
  // 1️⃣ Load cart
  // =====================================================
  useEffect(() => {
    async function loadCart() {
      try {
        const data = await getMyCart();
        setCart(data);
      } catch (e) {
        if (e.message === "UNAUTHORIZED") {
          navigate("/login");
        } else {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, [navigate]);

  // =====================================================
  // 2️⃣ Compute checkoutItems (PHẢI nằm TRƯỚC useEffect dùng nó)
  // =====================================================
  const checkoutItems = useMemo(() => {
    if (!cart?.items?.length || !selectedItems.length) return [];
    return cart.items.filter(item =>
      selectedItems.includes(item.cartItemId)
    );
  }, [cart?.items, selectedItems]);

  // =====================================================
  // 3️⃣ Auto preview promotion (debounced)
  // =====================================================
  useEffect(() => {
    if (!checkoutItems.length || !promotionCode.trim()) {
      setPreview(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await previewCheckout({
          cartItemIds: checkoutItems.map(i => i.cartItemId),
          promotionCode: promotionCode.trim(),
        });
        setPreview(data);
      } catch {
        // fail silently for auto preview
        setPreview(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [checkoutItems, promotionCode]);

  // =====================================================
  // 4️⃣ Price calculations
  // =====================================================
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );

  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  // Final values (after promo preview)
  const finalSubtotal = preview?.subtotal ?? subtotal;
  const finalShippingFee = preview?.shippingFee ?? shippingFee;
  const finalTotal = preview?.total ?? total;
  const finalDiscount = preview?.discount ?? 0;


  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyPromo = async () => {
    try {
      if (!checkoutItems.length) return;

      const data = await previewCheckout({
        cartItemIds: checkoutItems.map(i => i.cartItemId),
        promotionCode: promotionCode.trim() || null,
      });

      setPreview(data);
    } catch (e) {
      setPreview(null);
      alert(getFriendlyErrorMessage(e.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkoutItems.length) {
      alert("Không có sản phẩm nào để thanh toán");
      return;
    }

    // Validate form
    const required = ['fullName', 'phone', 'email', 'address', 'city'];
    const missing = required.filter(field => !shippingInfo[field].trim());
    if (missing.length) {
      alert(`Vui lòng điền đầy đủ thông tin: ${missing.join(', ')}`);
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        cartItemIds: checkoutItems.map(i => i.cartItemId),
        shippingInfo,
        paymentMethod,
        note,
        promotionCode: promotionCode.trim() || null,
      };

      console.log("Order data:", orderData);

      // Call checkout API
      const response = await checkout(orderData);

      console.log("Checkout response:", response);
      alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
      navigate(`/order-success/${response.orderId}`);

    } catch (err) {
      console.error(err);
      alert(getFriendlyErrorMessage(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-center">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-red-600">{error}</div>
      </div>
    );
  }

  if (!checkoutItems.length) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-center">
          <p>Không có sản phẩm nào để thanh toán</p>
          <button
            onClick={() => navigate("/cart")}
            className="mt-4 rounded-lg bg-primary px-6 py-2 text-white"
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-gray-500">
          <a className="text-primary hover:underline" href="/">
            Trang chủ
          </a>
          <span>/</span>
          <a className="text-primary hover:underline" href="/cart">
            Giỏ hàng
          </a>
          <span>/</span>
          <span className="font-medium text-[#333333] dark:text-text-dark">
            Thanh toán
          </span>
        </nav>

        <h1 className="mb-8 text-3xl font-black">Thanh toán</h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* LEFT: FORMS */}
          <div className="space-y-8 lg:col-span-2">
            {/* SHIPPING INFO */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Thông tin giao hàng</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="Số nhà, tên đường"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quận/Huyện
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={shippingInfo.district}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phường/Xã
                  </label>
                  <input
                    type="text"
                    name="ward"
                    value={shippingInfo.ward}
                    onChange={handleShippingChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* PAYMENT METHOD */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Phương thức thanh toán</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary"
                  />
                  <div>
                    <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                    <div className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary"
                  />
                  <div>
                    <div className="font-medium">Chuyển khoản ngân hàng</div>
                    <div className="text-sm text-gray-500">Thanh toán qua chuyển khoản</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary"
                  />
                  <div>
                    <div className="font-medium">Ví MoMo</div>
                    <div className="text-sm text-gray-500">Thanh toán qua ví điện tử MoMo</div>
                  </div>
                </label>
              </div>
            </section>

            {/* NOTE */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Ghi chú đơn hàng</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú về đơn hàng (tùy chọn)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                rows={3}
              />
            </section>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="space-y-6">
            <div className="sticky top-28 rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h3 className="mb-4 text-xl font-bold">Tóm tắt đơn hàng</h3>

              {/* PROMOTION CODE */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Mã giảm giá</label>
                <div className="flex gap-2">
                  <input
                    value={promotionCode}
                    onChange={(e) => setPromotionCode(e.target.value)}
                    placeholder="VD: NOITHAT10"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
                  >
                    Áp dụng
                  </button>
                </div>
                {preview && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <span>✅</span>
                    <span>Áp dụng thành công</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setPromotionCode("");
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Bỏ mã
                    </button>
                  </div>
                )}
              </div>

              {/* ITEMS */}
              <div className="space-y-3 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3">
                    <div
                      className="h-12 w-12 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        SL: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </div>
                    </div>
                    <div className="font-medium">{formatCurrency(item.lineTotal)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(finalSubtotal)}</span>
                </div>

                {finalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(finalDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{finalShippingFee === 0 ? "Miễn phí" : formatCurrency(finalShippingFee)}</span>
                </div>

                {finalSubtotal > 500000 && (
                  <div className="text-sm text-green-600">
                    🎉 Miễn phí vận chuyển cho đơn hàng trên 500.000₫
                  </div>
                )}

                <div className="border-t pt-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-lg bg-primary py-3 font-bold text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Đang xử lý..." : `Đặt hàng (${checkoutItems.length} sản phẩm)`}
              </button>
            </div>
          </aside>
        </form>
      </main>

      <MainFooter />
    </div>
  );
}

export default CheckoutPage;