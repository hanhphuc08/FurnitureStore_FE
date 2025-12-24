// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "http://localhost:8686";

function formatVnd(v) {
  const n = Number(v ?? 0);
  return n.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
}

function statusText(s) {
  // theo BE demo: NEW, CONFIRMED, SHIPPING, COMPLETED, CANCELLED
  switch (String(s || "").toUpperCase()) {
    case "NEW":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "SHIPPING":
      return "Đang giao";
    case "COMPLETED":
      return "Hoàn thành";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return s || "";
  }
}

function statusBadgeClass(s) {
  switch (String(s || "").toUpperCase()) {
    case "NEW":
      return "bg-yellow-100 text-yellow-700";
    case "CONFIRMED":
      return "bg-indigo-100 text-indigo-700";
    case "SHIPPING":
      return "bg-blue-100 text-blue-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function paymentStatusText(s) {
  // theo BE demo: UNPAID, PAID, FAILED, REFUNDED
  switch (String(s || "").toUpperCase()) {
    case "UNPAID":
      return "Chưa thanh toán";
    case "PAID":
      return "Đã thanh toán";
    case "FAILED":
      return "Thất bại";
    case "REFUNDED":
      return "Đã hoàn tiền";
    default:
      return s || "";
  }
}

function paymentBadgeClass(s) {
  switch (String(s || "").toUpperCase()) {
    case "UNPAID":
      return "bg-yellow-100 text-yellow-700";
    case "PAID":
      return "bg-green-100 text-green-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function fmtDateTime(isoOrNull) {
  if (!isoOrNull) return "";
  try {
    const d = new Date(isoOrNull);
    return d.toLocaleString("vi-VN");
  } catch {
    return String(isoOrNull);
  }
}

async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, { credentials: "include" });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Request failed");
  }
  return res.json();
}

async function apiPatch(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    let msg = txt || "Request failed";
    try {
      const j = JSON.parse(txt);
      msg = j?.message || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  return res.json().catch(() => ({}));
}

function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[92vw] max-w-4xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="text-lg font-bold">{title}</div>
          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>

        <div className="max-h-[75vh] overflow-auto px-5 py-4">{children}</div>

        {footer ? (
          <div className="flex items-center justify-end gap-2 border-t px-5 py-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

export default function AdminOrders() {
  // filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // paging
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // list state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // detail modal
  const [openDetail, setOpenDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [detail, setDetail] = useState(null);

  // edit modal
  const [openEdit, setOpenEdit] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPayStatus, setEditPayStatus] = useState("");
  const [editNote, setEditNote] = useState("");

  const totalPages = useMemo(() => {
    const tp = Math.ceil((total || 0) / (size || 1));
    return Number.isFinite(tp) ? tp : 0;
  }, [total, size]);

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (status) p.set("status", status);
    if (paymentStatus) p.set("paymentStatus", paymentStatus);
    if (paymentMethod) p.set("paymentMethod", paymentMethod);
    p.set("page", String(page));
    p.set("size", String(size));
    return p.toString();
  }, [q, status, paymentStatus, paymentMethod, page, size]);

  async function loadList() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet(`/api/admin/orders?${queryString}`);
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(Number(data.total ?? 0));
    } catch (e) {
      setError(e.message || "Không tải được danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  async function openDetailModal(orderId) {
    setOpenDetail(true);
    setDetail(null);
    setDetailLoading(true);
    setDetailError("");
    try {
      const data = await apiGet(`/api/admin/orders/${orderId}`);
      setDetail(data);
    } catch (e) {
      setDetailError(e.message || "Không tải được chi tiết đơn");
    } finally {
      setDetailLoading(false);
    }
  }

  function openEditModalFromDetail() {
    if (!detail) return;
    setEditError("");
    setEditStatus(detail.status || "");
    setEditPayStatus(detail.paymentStatus || "");
    setEditNote(detail.orderNote || "");
    setOpenEdit(true);
  }

  async function saveEdits() {
    if (!detail?.orderId) return;
    setEditSaving(true);
    setEditError("");
    try {
      // update status
      if (editStatus && editStatus !== detail.status) {
        await apiPatch(`/api/admin/orders/${detail.orderId}/status`, { status: editStatus });
      }
      // update payment status
      if (editPayStatus && editPayStatus !== detail.paymentStatus) {
        await apiPatch(`/api/admin/orders/${detail.orderId}/payment-status`, { paymentStatus: editPayStatus });
      }
      // update note
      if ((editNote ?? "") !== (detail.orderNote ?? "")) {
        await apiPatch(`/api/admin/orders/${detail.orderId}/note`, { note: editNote });
      }

      // reload detail + list
      const newDetail = await apiGet(`/api/admin/orders/${detail.orderId}`);
      setDetail(newDetail);
      await loadList();

      setOpenEdit(false);
    } catch (e) {
      setEditError(e.message || "Lưu thất bại");
    } finally {
      setEditSaving(false);
    }
  }

  async function cancelOrder(orderId) {
    const ok = window.confirm("Bạn chắc chắn muốn HỦY đơn này?");
    if (!ok) return;
    try {
      await apiPatch(`/api/admin/orders/${orderId}/status`, { status: "CANCELLED" });
      await loadList();
      // nếu đang mở detail của đơn đó thì refresh
      if (detail?.orderId === orderId) {
        const newDetail = await apiGet(`/api/admin/orders/${orderId}`);
        setDetail(newDetail);
      }
    } catch (e) {
      alert(e.message || "Hủy đơn thất bại");
    }
  }

  function handleApplyFilters() {
    // reset page when searching
    setPage(0);
    loadList();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-3xl font-extrabold text-primary">Quản lý đơn hàng</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-2 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <input
            className="w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 sm:max-w-sm"
            placeholder="Tìm mã đơn / tên / email..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
          />

          <select
            className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="NEW">Chờ xác nhận</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="SHIPPING">Đang giao</option>
            <option value="COMPLETED">Hoàn thành</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>

          <select
            className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Tất cả thanh toán</option>
            <option value="UNPAID">Chưa thanh toán</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="FAILED">Thất bại</option>
            <option value="REFUNDED">Hoàn tiền</option>
          </select>

          <select
            className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Tất cả phương thức</option>
            <option value="COD">COD</option>
            <option value="VNPAY">VNPAY</option>
            <option value="BANK">Chuyển khoản</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyFilters}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Lọc
          </button>

          <select
            className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            title="Số dòng / trang"
          >
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-primary/10 text-left text-xs uppercase text-primary">
              <th className="px-4 py-3">Mã đơn</th>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Ngày đặt</th>
              <th className="px-4 py-3 text-right">Tổng tiền</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thanh toán</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              items.map((o) => (
                <tr key={o.orderId} className="border-t hover:bg-primary/5">
                  <td className="px-4 py-3 font-semibold text-gray-800">#{o.orderId}</td>
                  <td className="px-4 py-3">{o.customerName}</td>
                  <td className="px-4 py-3">{o.customerEmail}</td>
                  <td className="px-4 py-3 text-center">{fmtDateTime(o.createdAt)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatVnd(o.totalAmount)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(o.status)}`}>
                      {statusText(o.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${paymentBadgeClass(o.paymentStatus)}`}>
                      {paymentStatusText(o.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                        onClick={() => openDetailModal(o.orderId)}
                      >
                        Xem
                      </button>

                      <button
                        className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                        onClick={async () => {
                          await openDetailModal(o.orderId);
                          // đợi detail load xong thì người dùng bấm "Cập nhật" trong modal
                        }}
                        title="Mở chi tiết rồi cập nhật"
                      >
                        Cập nhật
                      </button>

                      <button
                        className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                        onClick={() => cancelOrder(o.orderId)}
                      >
                        Hủy
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col gap-2 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            Tổng: <b>{total}</b> đơn • Trang <b>{page + 1}</b> / <b>{Math.max(1, totalPages)}</b>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Trước
            </button>
            <button
              className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        open={openDetail}
        title={detail ? `Chi tiết đơn #${detail.orderId}` : "Chi tiết đơn"}
        onClose={() => {
          setOpenDetail(false);
          setDetail(null);
          setDetailError("");
        }}
        footer={
          detail ? (
            <>
              <button
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => setOpenDetail(false)}
              >
                Đóng
              </button>

              <button
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                onClick={openEditModalFromDetail}
              >
                Cập nhật
              </button>
            </>
          ) : (
            <button
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => setOpenDetail(false)}
            >
              Đóng
            </button>
          )
        }
      >
        {detailLoading ? (
          <div className="py-10 text-center text-gray-600">Đang tải...</div>
        ) : detailError ? (
          <div className="py-10 text-center text-red-600">{detailError}</div>
        ) : !detail ? null : (
          <div className="space-y-6">
            {/* Header */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border p-4">
                <div className="text-sm text-gray-500">Khách hàng</div>
                <div className="font-semibold">{detail.customerName}</div>
                <div className="text-sm text-gray-600">{detail.customerEmail}</div>
                {detail.customerPhone ? <div className="text-sm text-gray-600">{detail.customerPhone}</div> : null}
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(detail.status)}`}>
                    {statusText(detail.status)}
                  </span>
                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${paymentBadgeClass(detail.paymentStatus)}`}>
                    {paymentStatusText(detail.paymentStatus)}
                  </span>
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                    {detail.paymentMethod || "—"}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Ngày tạo: <b>{fmtDateTime(detail.createdAt)}</b>
                </div>
                {detail.updatedAt ? (
                  <div className="text-sm text-gray-600">
                    Cập nhật: <b>{fmtDateTime(detail.updatedAt)}</b>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Address */}
            <div className="rounded-xl border p-4">
              <div className="mb-2 font-semibold">Địa chỉ giao hàng</div>
              {detail.addressId ? (
                <div className="text-sm text-gray-700">
                  <div><b>{detail.addressFullName || detail.customerName}</b> • {detail.addressPhone || detail.customerPhone || ""}</div>
                  <div>
                    {[
                      detail.street,
                      detail.ward,
                      detail.district,
                      detail.province,
                    ].filter(Boolean).join(", ")}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Không có địa chỉ</div>
              )}
            </div>

            {/* Items */}
            <div className="rounded-xl border p-4">
              <div className="mb-2 font-semibold">Sản phẩm</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left">Tên</th>
                      <th className="px-3 py-2 text-left">Biến thể</th>
                      <th className="px-3 py-2 text-center">SL</th>
                      <th className="px-3 py-2 text-right">Đơn giá</th>
                      <th className="px-3 py-2 text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(detail.items) && detail.items.length ? detail.items.map((it) => (
                      <tr key={it.orderItemId} className="border-t">
                        <td className="px-3 py-2">{it.productName}</td>
                        <td className="px-3 py-2 text-gray-600">{it.variantInfo || "—"}</td>
                        <td className="px-3 py-2 text-center">{it.quantity}</td>
                        <td className="px-3 py-2 text-right">{formatVnd(it.unitPrice)}</td>
                        <td className="px-3 py-2 text-right font-semibold">{formatVnd(it.totalPrice)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-3 py-6 text-center text-gray-400">Không có items</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl border p-4">
                <div className="mb-1 text-sm text-gray-500">Mã khuyến mãi</div>
                <div className="font-semibold">{detail.promotionCode || "—"}</div>

                <div className="mt-4 mb-1 text-sm text-gray-500">Ghi chú</div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">{detail.orderNote || "—"}</div>
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <b>{formatVnd(detail.subtotalAmount)}</b>
                </div>
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-gray-600">Giảm giá</span>
                  <b>- {formatVnd(detail.discountAmount)}</b>
                </div>
                <div className="flex items-center justify-between py-1 text-sm">
                  <span className="text-gray-600">Phí ship</span>
                  <b>{formatVnd(detail.shippingFee)}</b>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
                  <span className="font-semibold text-primary">Tổng</span>
                  <span className="text-lg font-extrabold text-primary">{formatVnd(detail.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={openEdit}
        title={detail ? `Cập nhật đơn #${detail.orderId}` : "Cập nhật đơn"}
        onClose={() => setOpenEdit(false)}
        footer={
          <>
            <button
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => setOpenEdit(false)}
              disabled={editSaving}
            >
              Hủy
            </button>
            <button
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
              onClick={saveEdits}
              disabled={editSaving}
            >
              {editSaving ? "Đang lưu..." : "Lưu"}
            </button>
          </>
        }
      >
        {!detail ? null : (
          <div className="space-y-4">
            {editError ? <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{editError}</div> : null}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1 text-sm font-semibold">Trạng thái đơn</div>
                <select
                  className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="NEW">Chờ xác nhận</option>
                  <option value="CONFIRMED">Đã xác nhận</option>
                  <option value="SHIPPING">Đang giao</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </div>

              <div>
                <div className="mb-1 text-sm font-semibold">Trạng thái thanh toán</div>
                <select
                  className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  value={editPayStatus}
                  onChange={(e) => setEditPayStatus(e.target.value)}
                >
                  <option value="UNPAID">Chưa thanh toán</option>
                  <option value="PAID">Đã thanh toán</option>
                  <option value="FAILED">Thất bại</option>
                  <option value="REFUNDED">Hoàn tiền</option>
                </select>
              </div>
            </div>

            <div>
              <div className="mb-1 text-sm font-semibold">Ghi chú admin</div>
              <textarea
                className="h-28 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="VD: gọi khách xác nhận, hẹn giao..."
              />
            </div>

            <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
              Tip: Nếu bạn muốn nút “Hủy” riêng trong modal, cứ set trạng thái = <b>CANCELLED</b> rồi bấm Lưu.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
