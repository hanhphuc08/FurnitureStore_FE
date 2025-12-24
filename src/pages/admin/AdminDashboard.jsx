import React, { useEffect, useMemo, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8686/api/admin/dashboard", { credentials: "include" })
      .then(async (res) => {
        const txt = await res.text();
        if (!res.ok) throw new Error(txt || "Lỗi tải dữ liệu dashboard");
        return JSON.parse(txt);
      })
      .then(setData)
      .catch((e) => setError(e.message || "Lỗi tải dữ liệu dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const maxRev7 = useMemo(() => {
    const arr = Array.isArray(data?.revenueLast7Days) ? data.revenueLast7Days : [];
    return Math.max(1, ...arr.map((x) => Number(x.revenue || 0)));
  }, [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
        <span className="ml-3 text-sm text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );

  if (error) return <div className="text-red-600 text-sm text-center mt-8">{error}</div>;
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-xs text-gray-500"></span>
      </div>

      {/* Tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Người dùng" value={data.users} icon="person" />
        <StatCard label="Sản phẩm đang bán" value={data.activeProducts} icon="inventory_2" />
        <StatCard label="Tổng đơn hàng" value={data.orders} icon="shopping_bag" />
        <StatCard label="Đơn hàng hôm nay" value={data.ordersToday} icon="today" />
      </div>

      {/* Doanh thu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard label="Doanh thu (tất cả)" value={formatVND(data.revenueAllTime)} icon="paid" />
        <StatCard label="Doanh thu (hôm nay)" value={formatVND(data.revenueToday)} icon="attach_money" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Đơn hàng theo trạng thái */}
        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Đơn hàng theo trạng thái</h2>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(data.ordersByStatus) &&
              data.ordersByStatus.map((row) => (
                <div
                  key={row.status}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700"
                >
                  <span className="font-medium">{row.status}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="font-semibold">{row.total}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Doanh thu 7 ngày */}
        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Doanh thu 7 ngày gần nhất</h2>
          <div className="flex gap-3 items-end h-40">
            {Array.isArray(data.revenueLast7Days) &&
              data.revenueLast7Days.map((item, idx) => {
                const rev = Number(item.revenue || 0);
                const h = Math.max(8, Math.round((rev / maxRev7) * 120)); // scale đẹp
                return (
                  <div key={idx} className="flex flex-col items-center justify-end">
                    <div
                      className="w-8 rounded bg-primary/70"
                      style={{ height: `${h}px` }}
                      title={formatVND(rev)}
                    />
                    <div className="mt-2 text-[11px] text-gray-500">
                      {String(item.day).slice(5)} {/* MM-DD */}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-2 text-xs text-gray-500">* Cột cao hơn = doanh thu lớn hơn</div>
        </div>
      </div>

      {/* Top sản phẩm 30 ngày */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Top sản phẩm 30 ngày</h2>
          <span className="text-xs text-gray-500">Theo đơn PAID</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-3">Tên sản phẩm</th>
                <th className="py-2 px-3 text-right">Số lượng</th>
                <th className="py-2 pl-3 text-right">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data.topProductsLast30Days) && data.topProductsLast30Days.length ? (
                data.topProductsLast30Days.map((p) => (
                  <tr key={p.product_id} className="border-b last:border-b-0">
                    <td className="py-2 pr-3 text-gray-900">{p.product_name}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{p.qty}</td>
                    <td className="py-2 pl-3 text-right font-medium text-gray-900">
                      {formatVND(p.gross)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 text-center text-gray-500" colSpan={3}>
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
      <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}

function formatVND(val) {
  const n = Number(val || 0);
  return n.toLocaleString("vi-VN") + "₫";
}
