const BASE_URL = "http://localhost:8686";

export async function getCategoryTree() {
  const res = await fetch(`${BASE_URL}/api/categories/tree`, {
    credentials: "include", // ✅ thêm
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không tải được danh mục");
  }
  return res.json();
}

export async function getProducts(params = {}) {
  const url = new URL(`${BASE_URL}/api/products`);

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) return;

    if (Array.isArray(v)) v.forEach((item) => url.searchParams.append(k, item));
    else url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    credentials: "include", // ✅ thêm
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không tải được sản phẩm");
  }
  return res.json();
}

export async function getProductDetail(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${encodeURIComponent(slug)}`, {
    credentials: "include", // ✅ thêm
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Không tải được chi tiết sản phẩm");
  }
  return res.json();
}
