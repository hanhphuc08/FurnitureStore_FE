const BASE_URL = "http://localhost:8686";

/** Lấy giỏ hàng hiện tại */
export async function getMyCart() {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "GET",
    credentials: "include",
    
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không tải được giỏ hàng");
  }

  return res.json();
}

/** Thêm sản phẩm vào giỏ */
export async function addToCart({ productId, variantId = null, quantity = 1 }) {
  const res = await fetch(`${BASE_URL}/api/cart/items`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, variantId, quantity }),
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không thêm được vào giỏ");
  }

  return res.json();
}

/** Cập nhật số lượng */
export async function updateCartItemQty(cartItemId, quantity) {
  const res = await fetch(`${BASE_URL}/api/cart/items/${cartItemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không cập nhật được số lượng");
  }

  return res.json();
}

/** Xóa item */
export async function removeCartItem(cartItemId) {
  const res = await fetch(`${BASE_URL}/api/cart/items/${cartItemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không xóa được sản phẩm");
  }

  return res.json();
}
