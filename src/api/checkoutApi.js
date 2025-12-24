const BASE_URL = "http://localhost:8686";

/**
 * Checkout đơn hàng
 * @param {Object} checkoutData - Dữ liệu checkout
 * @param {Array} checkoutData.items - Danh sách items trong đơn hàng
 * @param {Object} checkoutData.shippingInfo - Thông tin giao hàng
 * @param {string} checkoutData.paymentMethod - Phương thức thanh toán
 * @param {string} checkoutData.note - Ghi chú đơn hàng
 * @param {number} checkoutData.subtotal - Tạm tính
 * @param {number} checkoutData.shippingFee - Phí vận chuyển
 * @param {number} checkoutData.total - Tổng tiền
 */
export async function checkout(checkoutData) {
  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkoutData),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (res.status === 403) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Không có quyền thực hiện thao tác này");
  }

  if (res.status === 400) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Dữ liệu không hợp lệ");
  }

  if (res.status === 409) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Xung đột dữ liệu");
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không thể thanh toán");
  }

  return res.json();
}

/**
 * Preview checkout với mã giảm giá
 * @param {Object} data - Dữ liệu preview
 * @param {Array} data.cartItemIds - Danh sách cartItemId
 * @param {string|null} data.promotionCode - Mã giảm giá
 */
export async function previewCheckout(data) {
  const res = await fetch(`${BASE_URL}/api/checkout/preview`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  const error = !res.ok ? await res.json().catch(() => ({})) : null;
  if (!res.ok) throw new Error(error?.message || "Không thể áp dụng mã");
  return res.json();
}

/**
 * Tạo URL thanh toán VNPay (mock)
 * @param {number} orderId - ID đơn hàng
 */
export async function createMockVnpayPayment(orderId) {
  // For mock, directly return FE URL instead of calling BE
  return { paymentUrl: `http://localhost:5173/mock-vnpay/${orderId}` };
}