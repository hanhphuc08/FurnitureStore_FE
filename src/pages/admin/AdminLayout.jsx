import React from "react";
import { Link, Outlet } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Quản lý tài khoản", path: "/admin/users" },
  { label: "Quản lý sản phẩm", path: "/admin/products" },
  { label: "Quản lý đơn hàng", path: "/admin/orders" },
  { label: "Tư vấn khách hàng", path: "/admin/consulting" },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <div className="text-2xl font-bold mb-8 text-primary">Admin Panel</div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-2 rounded hover:bg-primary/10 text-gray-700 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
