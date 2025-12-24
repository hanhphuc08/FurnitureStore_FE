import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "http://localhost:8686";

// ====== VARIANTS API (nếu BE bạn khác thì đổi ở đây) ======
const API = {
  listVariants: (productId) => `${BASE_URL}/api/admin/products/${productId}/variants`,
  createVariant: (productId) => `${BASE_URL}/api/admin/products/${productId}/variants`,
  updateVariant: (variantId) => `${BASE_URL}/api/admin/variants/${variantId}`,
  toggleVariantActive: (variantId) => `${BASE_URL}/api/admin/variants/${variantId}/active`,
  deleteVariant: (variantId) => `${BASE_URL}/api/admin/variants/${variantId}`,
};
// =========================================================

function toNumberOrNull(v) {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function AdminProductModal({
  open,
  mode, // "create" | "edit"
  productId,
  categories, // [{category_id, name}]
  onClose,
  onSaved, // () => void
}) {
  const isEdit = mode === "edit";

  const [tab, setTab] = useState("info"); // info | variants

  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [err, setErr] = useState("");

  // --------- PRODUCT FORM ----------
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [baseStock, setBaseStock] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");

  const catOptions = useMemo(() => {
    const arr = Array.isArray(categories) ? categories : [];
    return arr.filter((c) => String(c.category_id) !== "");
  }, [categories]);

  function resetProductForm() {
    setCategoryId(catOptions[0]?.category_id ? String(catOptions[0].category_id) : "");
    setName("");
    setSlug("");
    setSku("");
    setBasePrice("");
    setBaseStock("");
    setMainImage("");
    setIsActive(true);
    setShortDesc("");
    setDescription("");
    setErr("");
  }

  // --------- VARIANTS ----------
  const [variants, setVariants] = useState([]);
  const [vLoading, setVLoading] = useState(false);
  const [vErr, setVErr] = useState("");

  // variant form
  const [vOpen, setVOpen] = useState(false);
  const [vMode, setVMode] = useState("create"); // create | edit
  const [editingVariantId, setEditingVariantId] = useState(null);

  const [vSku, setVSku] = useState("");
  const [vColor, setVColor] = useState("");
  const [vSize, setVSize] = useState("");
  const [vMaterial, setVMaterial] = useState("");
  const [vExtraDesc, setVExtraDesc] = useState("");
  const [vPrice, setVPrice] = useState("");
  const [vStock, setVStock] = useState("");
  const [vActive, setVActive] = useState(true);

  function resetVariantForm() {
    setVSku("");
    setVColor("");
    setVSize("");
    setVMaterial("");
    setVExtraDesc("");
    setVPrice("");
    setVStock("");
    setVActive(true);
    setVErr("");
  }

  async function loadVariants(pid) {
    if (!pid) return;
    try {
      setVLoading(true);
      setVErr("");
      const res = await fetch(API.listVariants(pid), { credentials: "include" });
      const txt = await res.text();
      if (!res.ok) throw new Error(txt || "Không tải được biến thể");
      const data = JSON.parse(txt);
      // data có thể là {items:[...]} hoặc mảng
      const list = Array.isArray(data) ? data : (data.items || data.variants || []);
      setVariants(Array.isArray(list) ? list : []);
    } catch (e) {
      setVErr(e.message || "Lỗi tải biến thể");
    } finally {
      setVLoading(false);
    }
  }

  function openCreateVariant() {
    setVMode("create");
    setEditingVariantId(null);
    resetVariantForm();
    setVOpen(true);
  }

  function openEditVariant(row) {
    const id = row.variant_id ?? row.id ?? row.variantId;
    setVMode("edit");
    setEditingVariantId(id);

    setVSku(row.sku ?? "");
    setVColor(row.color ?? "");
    setVSize(row.size ?? "");
    setVMaterial(row.material ?? "");
    setVExtraDesc(row.extra_desc ?? row.extraDesc ?? "");
    setVPrice(row.price != null ? String(row.price) : "");
    setVStock(row.stock != null ? String(row.stock) : "");
    setVActive(Boolean(row.is_active ?? row.isActive));

    setVErr("");
    setVOpen(true);
  }

  async function submitVariant(e) {
    e.preventDefault();

    if (!vSku.trim()) return setVErr("SKU biến thể không được trống.");
    if (toNumberOrNull(vPrice) == null) return setVErr("Giá biến thể không hợp lệ.");
    if (toNumberOrNull(vStock) == null) return setVErr("Kho biến thể không hợp lệ.");

    const payload = {
      sku: vSku.trim(),
      color: vColor.trim(),
      size: vSize.trim(),
      material: vMaterial.trim(),
      extraDesc: vExtraDesc.trim(),
      price: Number(vPrice),
      stock: Number(vStock),
      isActive: Boolean(vActive),
    };

    try {
      setVLoading(true);
      setVErr("");

      let res;
      if (vMode === "create") {
        res = await fetch(API.createVariant(productId), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API.updateVariant(editingVariantId), {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const txt = await res.text();
      if (!res.ok) {
        if (txt.includes("SKU_EXISTS")) throw new Error("SKU biến thể đã tồn tại.");
        throw new Error(txt || "Lưu biến thể thất bại");
      }

      setVOpen(false);
      await loadVariants(productId);
    } catch (e2) {
      setVErr(e2.message || "Lưu biến thể thất bại");
    } finally {
      setVLoading(false);
    }
  }

  async function toggleVariantActive(row) {
    const id = row.variant_id ?? row.id ?? row.variantId;
    const current = Boolean(row.is_active ?? row.isActive);
    const next = !current;

    const ok = window.confirm(next ? "Hiện biến thể này?" : "Ẩn biến thể này?");
    if (!ok) return;

    try {
      setVLoading(true);
      setVErr("");
      const res = await fetch(API.toggleVariantActive(id), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      const txt = await res.text();
      if (!res.ok) throw new Error(txt || "Cập nhật trạng thái biến thể thất bại");
      await loadVariants(productId);
    } catch (e) {
      setVErr(e.message || "Cập nhật thất bại");
    } finally {
      setVLoading(false);
    }
  }

  async function deleteVariant(row) {
    const id = row.variant_id ?? row.id ?? row.variantId;
    const ok = window.confirm("Xóa biến thể này? (không thể hoàn tác)");
    if (!ok) return;

    try {
      setVLoading(true);
      setVErr("");
      const res = await fetch(API.deleteVariant(id), {
        method: "DELETE",
        credentials: "include",
      });
      const txt = await res.text();
      if (!res.ok) throw new Error(txt || "Xóa biến thể thất bại");
      await loadVariants(productId);
    } catch (e) {
      setVErr(e.message || "Xóa thất bại");
    } finally {
      setVLoading(false);
    }
  }

  // --------- OPEN MODAL ----------
  useEffect(() => {
    if (!open) return;

    setTab("info");
    setErr("");

    if (!isEdit) {
      resetProductForm();
      setVariants([]);
      setVErr("");
      setVOpen(false);
      return;
    }

    (async () => {
      try {
        setLoadingDetail(true);
        setErr("");

        const res = await fetch(`${BASE_URL}/api/admin/products/${productId}`, {
          credentials: "include",
        });
        const txt = await res.text();
        if (!res.ok) throw new Error(txt || "Không tải được dữ liệu sản phẩm");

        const data = JSON.parse(txt);
        const p = data.product || data;

        setCategoryId(p.category_id != null ? String(p.category_id) : "");
        setName(p.name ?? "");
        setSlug(p.slug ?? "");
        setSku(p.sku ?? "");
        setBasePrice(p.base_price != null ? String(p.base_price) : "");
        setBaseStock(p.base_stock != null ? String(p.base_stock) : "");
        setMainImage(p.main_image ?? "");
        setIsActive(Boolean(p.is_active ?? p.isActive));
        setShortDesc(p.short_desc ?? "");
        setDescription(p.description ?? "");

        // load variants
        await loadVariants(productId);
      } catch (e) {
        setErr(e.message || "Có lỗi xảy ra");
      } finally {
        setLoadingDetail(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, productId]);

  function validateProduct() {
    if (!categoryId) return "Vui lòng chọn danh mục (categoryId).";
    if (!name.trim()) return "Tên sản phẩm không được trống.";
    if (!slug.trim()) return "Slug không được trống.";
    if (!sku.trim()) return "SKU không được trống.";
    if (toNumberOrNull(basePrice) == null) return "Giá không hợp lệ.";
    if (toNumberOrNull(baseStock) == null) return "Kho không hợp lệ.";
    return "";
  }

  async function handleSubmitProduct(e) {
    e.preventDefault();
    const v = validateProduct();
    if (v) return setErr(v);

    try {
      setLoading(true);
      setErr("");

      const payload = {
        categoryId: Number(categoryId),
        name: name.trim(),
        slug: slug.trim(),
        sku: sku.trim(),
        shortDesc: shortDesc.trim(),
        description: description.trim(),
        basePrice: Number(basePrice),
        baseStock: Number(baseStock),
        mainImage: mainImage.trim(),
        isActive: Boolean(isActive),
      };

      const url = isEdit
        ? `${BASE_URL}/api/admin/products/${productId}`
        : `${BASE_URL}/api/admin/products`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const txt = await res.text();
      if (!res.ok) {
        if (txt.includes("SLUG_EXISTS")) throw new Error("Slug đã tồn tại.");
        if (txt.includes("SKU_EXISTS")) throw new Error("SKU đã tồn tại.");
        if (txt.includes("CATEGORY_NOT_FOUND")) throw new Error("Danh mục không tồn tại.");
        throw new Error(txt || "Lưu thất bại");
      }

      onSaved?.();
      onClose?.();
    } catch (e2) {
      setErr(e2.message || "Lưu thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !loading && !loadingDetail && onClose?.()}
      />

      <div className="relative w-[95vw] max-w-4xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="font-bold text-lg">
            {isEdit ? `Sửa sản phẩm #${productId}` : "Thêm sản phẩm"}
          </div>
          <button
            onClick={() => !loading && !loadingDetail && onClose?.()}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4">
          <div className="inline-flex rounded-lg border overflow-hidden">
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                tab === "info" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setTab("info")}
              type="button"
            >
              Thông tin
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                tab === "variants" ? "bg-gray-100" : "bg-white"
              } ${!isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => isEdit && setTab("variants")}
              type="button"
              title={!isEdit ? "Cần tạo sản phẩm trước" : ""}
              disabled={!isEdit}
            >
              Biến thể
            </button>
          </div>
          {!isEdit && (
            <div className="mt-2 text-xs text-gray-500">
              * Tab “Biến thể” chỉ mở khi bạn đang sửa (đã có productId).
            </div>
          )}
        </div>

        <div className="p-5">
          {loadingDetail ? (
            <div className="py-10 text-center text-gray-500">Đang tải dữ liệu...</div>
          ) : tab === "info" ? (
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Danh mục</div>
                  <select
                    className="w-full border rounded-lg px-3 py-2 bg-white"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {catOptions.length ? (
                      catOptions.map((c) => (
                        <option key={String(c.category_id)} value={String(c.category_id)}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <option value="">(Chưa có API categories) - Nhập categoryId</option>
                    )}
                  </select>

                  {!catOptions.length && (
                    <input
                      className="w-full mt-2 border rounded-lg px-3 py-2"
                      placeholder="Nhập categoryId (số)"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    />
                  )}
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium">Trạng thái</div>
                  <select
                    className="w-full border rounded-lg px-3 py-2 bg-white"
                    value={isActive ? "1" : "0"}
                    onChange={(e) => setIsActive(e.target.value === "1")}
                  >
                    <option value="1">Đang bán</option>
                    <option value="0">Ẩn</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Tên sản phẩm</div>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Sofa văng 3 chỗ..."
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium">SKU</div>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Ví dụ: SF-0001"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Slug</div>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="sofa-vang-3-cho"
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium">Ảnh chính (URL)</div>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="/images/products/xxx.jpg"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Giá</div>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    min={0}
                  />
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium">Kho</div>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={baseStock}
                    onChange={(e) => setBaseStock(e.target.value)}
                    min={0}
                  />
                </label>
              </div>

              <label className="space-y-1">
                <div className="text-sm font-medium">Mô tả ngắn</div>
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </label>

              <label className="space-y-1">
                <div className="text-sm font-medium">Mô tả chi tiết</div>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              {err && <div className="text-sm text-red-600">{err}</div>}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onClose?.()}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white font-semibold disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          ) : (
            // ===== Variants Tab =====
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Danh sách biến thể</div>
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                  onClick={openCreateVariant}
                  type="button"
                >
                  + Thêm biến thể
                </button>
              </div>

              {vErr && <div className="text-sm text-red-600">{vErr}</div>}

              <div className="border rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">SKU</th>
                      <th className="px-4 py-3 text-left">Màu</th>
                      <th className="px-4 py-3 text-left">Size</th>
                      <th className="px-4 py-3 text-left">Chất liệu</th>
                      <th className="px-4 py-3 text-right">Giá</th>
                      <th className="px-4 py-3 text-center">Kho</th>
                      <th className="px-4 py-3 text-center">Trạng thái</th>
                      <th className="px-4 py-3 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vLoading ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                          Đang tải...
                        </td>
                      </tr>
                    ) : variants.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                          Chưa có biến thể nào.
                        </td>
                      </tr>
                    ) : (
                      variants.map((row) => {
                        const id = row.variant_id ?? row.id ?? row.variantId;
                        const active = Boolean(row.is_active ?? row.isActive);
                        return (
                          <tr key={id} className="border-t">
                            <td className="px-4 py-3 font-semibold">{id}</td>
                            <td className="px-4 py-3">{row.sku}</td>
                            <td className="px-4 py-3">{row.color || "-"}</td>
                            <td className="px-4 py-3">{row.size || "-"}</td>
                            <td className="px-4 py-3">{row.material || "-"}</td>
                            <td className="px-4 py-3 text-right">{Number(row.price || 0).toLocaleString("vi-VN")}₫</td>
                            <td className="px-4 py-3 text-center">{row.stock ?? 0}</td>
                            <td className="px-4 py-3 text-center">
                              {active ? (
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
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                                  type="button"
                                  onClick={() => openEditVariant(row)}
                                >
                                  Sửa
                                </button>
                                <button
                                  className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold ${
                                    active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                  }`}
                                  type="button"
                                  onClick={() => toggleVariantActive(row)}
                                >
                                  {active ? "Ẩn" : "Hiện"}
                                </button>
                                <button
                                  className="px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-semibold hover:bg-black"
                                  type="button"
                                  onClick={() => deleteVariant(row)}
                                >
                                  Xóa
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

              {/* Variant Form Modal inside */}
              {vOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40" onClick={() => !vLoading && setVOpen(false)} />
                  <div className="relative w-[95vw] max-w-2xl rounded-xl bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b px-5 py-4">
                      <div className="font-bold">
                        {vMode === "create" ? "Thêm biến thể" : `Sửa biến thể #${editingVariantId}`}
                      </div>
                      <button
                        className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
                        type="button"
                        onClick={() => !vLoading && setVOpen(false)}
                      >
                        Đóng
                      </button>
                    </div>

                    <form className="p-5 space-y-3" onSubmit={submitVariant}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="space-y-1">
                          <div className="text-sm font-medium">SKU biến thể</div>
                          <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={vSku}
                            onChange={(e) => setVSku(e.target.value)}
                            placeholder="VD: TC-0001-RED"
                          />
                        </label>
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Trạng thái</div>
                          <select
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                            value={vActive ? "1" : "0"}
                            onChange={(e) => setVActive(e.target.value === "1")}
                          >
                            <option value="1">Đang bán</option>
                            <option value="0">Ẩn</option>
                          </select>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Màu</div>
                          <input className="w-full border rounded-lg px-3 py-2" value={vColor} onChange={(e) => setVColor(e.target.value)} />
                        </label>
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Size</div>
                          <input className="w-full border rounded-lg px-3 py-2" value={vSize} onChange={(e) => setVSize(e.target.value)} />
                        </label>
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Chất liệu</div>
                          <input className="w-full border rounded-lg px-3 py-2" value={vMaterial} onChange={(e) => setVMaterial(e.target.value)} />
                        </label>
                      </div>

                      <label className="space-y-1">
                        <div className="text-sm font-medium">Mô tả thêm</div>
                        <input
                          className="w-full border rounded-lg px-3 py-2"
                          value={vExtraDesc}
                          onChange={(e) => setVExtraDesc(e.target.value)}
                          placeholder="VD: bản khung sắt, vải nỉ..."
                        />
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Giá</div>
                          <input
                            type="number"
                            min={0}
                            className="w-full border rounded-lg px-3 py-2"
                            value={vPrice}
                            onChange={(e) => setVPrice(e.target.value)}
                          />
                        </label>
                        <label className="space-y-1">
                          <div className="text-sm font-medium">Kho</div>
                          <input
                            type="number"
                            min={0}
                            className="w-full border rounded-lg px-3 py-2"
                            value={vStock}
                            onChange={(e) => setVStock(e.target.value)}
                          />
                        </label>
                      </div>

                      {vErr && <div className="text-sm text-red-600">{vErr}</div>}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                          type="button"
                          onClick={() => setVOpen(false)}
                          disabled={vLoading}
                        >
                          Hủy
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg bg-primary text-white font-semibold disabled:opacity-60"
                          type="submit"
                          disabled={vLoading}
                        >
                          {vLoading ? "Đang lưu..." : "Lưu"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
