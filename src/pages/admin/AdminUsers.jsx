import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "http://localhost:8686";

/* ================= Helpers ================= */

function badgeStatus(status) {
  const s = String(status || "").toUpperCase();
  if (s === "ACTIVE")
    return "inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold";
  if (s === "INACTIVE")
    return "inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold";
  return "inline-block px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold";
}

function labelStatus(status) {
  const s = String(status || "").toUpperCase();
  if (s === "ACTIVE") return "Hoạt động";
  if (s === "INACTIVE") return "Tạm ngưng";
  return "Bị khóa";
}

/* ================= Component ================= */

export default function AdminUsers() {
  /* current user (admin đang đăng nhập) */
  const me = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
  const myId = me?.userId;

  /* filters */
  const [keyword, setKeyword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [status, setStatus] = useState("");

  /* paging */
  const [page, setPage] = useState(0);
  const size = 10;

  /* data */
  const [roles, setRoles] = useState([]);
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (keyword.trim()) p.set("keyword", keyword.trim());
    if (roleId) p.set("roleId", roleId);
    if (status) p.set("status", status);
    p.set("page", String(page));
    p.set("size", String(size));
    return p.toString();
  }, [keyword, roleId, status, page]);

  /* ================= API ================= */

  async function fetchRoles() {
    const res = await fetch(`${BASE_URL}/api/admin/users/roles`, {
      credentials: "include",
    });
    const txt = await res.text();
    if (!res.ok) throw new Error(txt || "Load roles failed");
    return JSON.parse(txt);
  }

  async function fetchUsers() {
    const res = await fetch(`${BASE_URL}/api/admin/users?${query}`, {
      credentials: "include",
    });
    const txt = await res.text();
    if (!res.ok) throw new Error(txt || "Load users failed");
    return JSON.parse(txt);
  }

  /* ================= Effects ================= */

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const [rolesData, usersData] = await Promise.all([
          roles.length ? Promise.resolve(roles) : fetchRoles(),
          fetchUsers(),
        ]);

        if (cancelled) return;
        if (!roles.length) setRoles(rolesData);
        setResp(usersData);
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

  /* reset page when filters change */
  useEffect(() => {
    setPage(0);
  }, [keyword, roleId, status]);

  /* ================= Actions ================= */

  async function updateStatus(userId, nextStatus) {
    if (userId === myId) {
      setErr("Bạn không thể thay đổi trạng thái của chính mình.");
      return;
    }

    const ok = window.confirm(`Đổi trạng thái user #${userId} → ${nextStatus}?`);
    if (!ok) return;

    try {
      setErr("");
      const res = await fetch(`${BASE_URL}/api/admin/users/${userId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const txt = await res.text();
      if (!res.ok) {
        if (txt.includes("CANNOT_CHANGE_SELF_STATUS"))
          throw new Error("Bạn không thể thay đổi trạng thái của chính mình.");
        throw new Error(txt || "Cập nhật trạng thái thất bại");
      }

      setResp(await fetchUsers());
    } catch (e) {
      setErr(e.message || "Cập nhật thất bại");
    }
  }

  async function updateRole(userId, nextRoleId) {
    if (userId === myId) {
      setErr("Bạn không thể đổi quyền của chính mình.");
      return;
    }

    try {
      setErr("");
      const res = await fetch(`${BASE_URL}/api/admin/users/${userId}/role`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId: Number(nextRoleId) }),
      });
      const txt = await res.text();
      if (!res.ok) {
        if (txt.includes("CANNOT_CHANGE_SELF_ROLE"))
          throw new Error("Bạn không thể đổi quyền của chính mình.");
        throw new Error(txt || "Cập nhật quyền thất bại");
      }

      setResp(await fetchUsers());
    } catch (e) {
      setErr(e.message || "Cập nhật thất bại");
    }
  }

  /* ================= Render ================= */

  const items = resp?.items || [];
  const totalPages = resp?.totalPages ?? 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Quản lý tài khoản</h1>
        <div className="text-sm text-gray-500">
          Tổng: <b>{resp?.total ?? 0}</b>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-4 space-y-2">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            className="border rounded-lg px-4 py-2 w-full md:max-w-sm"
            placeholder="Tìm theo tên / email / phone..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option value="">Tất cả quyền</option>
            {roles.map((r) => (
              <option key={r.role_id} value={r.role_id}>
                {r.role_name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="BANNED">BANNED</option>
          </select>

          <button
            onClick={() => {
              setKeyword("");
              setRoleId("");
              setStatus("");
            }}
            className="ml-auto px-3 py-2 border rounded-lg text-sm"
          >
            Reset
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
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-center">Quyền</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              items.map((u) => {
                const isMe = u.user_id === myId;
                const upperStatus = String(u.status || "").toUpperCase();

                return (
                  <tr key={u.user_id} className="border-t">
                    <td className="px-4 py-3 font-semibold">{u.user_id}</td>
                    <td className="px-4 py-3">{u.full_name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.phone || "-"}</td>

                    <td className="px-4 py-3 text-center">
                      <select
                        disabled={isMe}
                        className="border rounded-lg px-2 py-1 bg-white disabled:opacity-50"
                        value={u.role_id}
                        onChange={(e) => updateRole(u.user_id, e.target.value)}
                        title={isMe ? "Không thể đổi quyền của chính bạn" : "Đổi quyền"}
                      >
                        {roles.map((r) => (
                          <option key={r.role_id} value={r.role_id}>
                            {r.role_name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className={badgeStatus(u.status)}>
                        {labelStatus(u.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {upperStatus !== "ACTIVE" ? (
                          <button
                            disabled={isMe}
                            onClick={() => updateStatus(u.user_id, "ACTIVE")}
                            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs disabled:opacity-50"
                          >
                            Mở
                          </button>
                        ) : (
                          <>
                            <button
                              disabled={isMe}
                              onClick={() => updateStatus(u.user_id, "INACTIVE")}
                              className="px-3 py-1.5 rounded-lg bg-gray-700 text-white text-xs disabled:opacity-50"
                            >
                              Tạm ngưng
                            </button>
                            <button
                              disabled={isMe}
                              onClick={() => updateStatus(u.user_id, "BANNED")}
                              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs disabled:opacity-50"
                            >
                              Khóa
                            </button>
                          </>
                        )}
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
    </div>
  );
}
