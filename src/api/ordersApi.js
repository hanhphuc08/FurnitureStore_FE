const BASE_URL = "http://localhost:8686";

/**
 * Lấy danh sách đơn hàng của người dùng
 */
export async function getOrders() {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không thể lấy danh sách đơn hàng");
  }

  return res.json();
}