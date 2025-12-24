import React, { useEffect, useMemo, useState } from "react";
import AdminProductModal from "./AdminProductModal";

const BASE_URL = "http://localhost:8686";

function formatVnd(v) {
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Number(v || 0));
  } catch {
    return String(v ?? "");
  }
}

function toBoolActiveFilter(val) {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}

export default function AdminProducts() {
  // filters
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState(""); // '' = all
  const [active, setActive] = useState(""); // '' | 'true' | 'false'

  // paging
  const [page, setPage] = useState(0);
  const size = 10;

  // data
  const [resp, setResp] = useState(null);
  const [categories, setCategories] = useState([{ category_id: "", name: "Tất cả" }]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (keyword.trim()) p.set("keyword", keyword.trim());
    if (categoryId) p.set("categoryId", categoryId);
    const activeBool = toBoolActiveFilter(active);
    if (activeBool !== null) p.set("active", String(activeBool));
    p.set("page", String(page));
    p.set("size", String(size));
    return p.toString();
  }, [keyword, categoryId, active, page]);

  async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/api/admin/products?${query}`, {
      credentials: "include",
    });
    const txt = await res.text();
    if (!res.ok) throw new Error(txt || "Lỗi tải danh sách sản phẩm");
    return JSON.parse(txt);
  }

  async function fetchCategoriesSafe() {
    // optional endpoint
    try {
      const res = await fetch(`${BASE_URL}/api/categories`, {
        credentials: "include",
      });
      const txt = await res.text();
      if (!res.ok) return null;

      const data = JSON.parse(txt);
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.items)) return data.items;
      return null;
    } catch {
      return null;
    }
  }

  async function reload() {
    try {
      setLoading(true);
      setErr("");
      setResp(await fetchProducts());
    } catch (e) {
      setErr(e.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const [productsData, cats] = await Promise.all([
          fetchProducts(),
          categories.length > 1 ? Promise.resolve(null) : fetchCategoriesSafe(),
        ]);

        if (cancelled) return;

        setResp(productsData);

        if (cats && Array.isArray(cats)) {
          const mapped = cats
            .map((c) => ({
              category_id: c.category_id ?? c.id ?? c.categoryId,
              name: c.name ?? c.category_name ?? c.categoryName,
            }))
            .filter((c) => c.category_id != null && c.name);

          setCategories([{ category_id: "", name: "Tất cả" }, ...mapped]);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || "Có lỗi xảy ra");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [keyword, categoryId, active]);

  async function toggleActive(productId, currentIsActive) {
    const next = !currentIsActive;
    const ok = window.confirm(next ? "Hiện sản phẩm này?" : "Ẩn sản phẩm này?");
    if (!ok) return;

    try {
      setErr("");
      const res = await fetch(`${BASE_URL}/api/admin/products/${productId}/active`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });

      const txt = await res.text();
      if (!res.ok) throw new Error(txt || "Cập nhật trạng thái thất bại");

      setResp(await fetchProducts());
    } catch (e) {
      setErr(e.message || "Cập nhật thất bại");
    }
  }

  function openCreate() {
    setModalMode("create");
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(productId) {
    setModalMode("edit");
    setEditingId(productId);
    setModalOpen(true);
  }

  const items = resp?.items || [];
  const totalPages = resp?.totalPages ?? 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Quản lý sản phẩm</h1>
        <div className="text-sm text-gray-500">
          Tổng: <b>{resp?.total ?? 0}</b>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-4 space-y-2">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            className="border rounded-lg px-4 py-2 w-full md:max-w-sm"
            placeholder="Tìm theo tên / SKU..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={String(c.category_id)} value={String(c.category_id)}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang bán</option>
            <option value="false">Đang ẩn</option>
          </select>

          <button
            onClick={() => {
              setKeyword("");
              setCategoryId("");
              setActive("");
            }}
            className="ml-auto px-3 py-2 border rounded-lg text-sm"
          >
            Reset
          </button>

          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {err && <div className="text-sm text-red-600">{err}</div>}
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Danh mục</th>
              <th className="px-4 py-3 text-right">Giá</th>
              <th className="px-4 py-3 text-center">Kho</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              items.map((p) => {
                const productId = p.product_id ?? p.id ?? p.productId;
                const isActive = Boolean(p.is_active ?? p.isActive);
                const name = p.name ?? "";
                const sku = p.sku ?? "";
                const categoryName = p.category_name ?? p.categoryName ?? "";
                const price = p.base_price ?? p.basePrice ?? 0;
                const stock = p.base_stock ?? p.baseStock ?? 0;

                return (
                  <tr key={productId} className="border-t">
                    <td className="px-4 py-3 font-semibold">{productId}</td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3 text-gray-600">{sku}</td>
                    <td className="px-4 py-3">{categoryName}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatVnd(price)}</td>
                    <td className="px-4 py-3 text-center">{stock}</td>
                    <td className="px-4 py-3 text-center">
                      {isActive ? (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Đang bán
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
                          Ẩn
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(productId)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => toggleActive(productId, isActive)}
                          className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold ${
                            isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {isActive ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-500">
          Trang <b>{page + 1}</b> / <b>{Math.max(1, totalPages)}</b>
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={loading || page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Modal */}
      <AdminProductModal
        open={modalOpen}
        mode={modalMode}
        productId={editingId}
        categories={categories}
        onClose={() => setModalOpen(false)}
        onSaved={reload}
      />
    </div>
  );
}
