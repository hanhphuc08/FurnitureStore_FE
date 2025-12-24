import React, { useState } from "react";


const mockStatus = [
  { id: '', name: 'Tất cả' },
  { id: 'pending', name: 'Chờ xử lý' },
  { id: 'done', name: 'Đã xử lý' },
];

const mockConsults = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', email: 'a@gmail.com', content: 'Tư vấn chọn sofa phòng khách', status: 'pending', date: '2025-12-18' },
  { id: 2, name: 'Trần Thị B', phone: '0912345678', email: 'b@gmail.com', content: 'Báo giá tủ quần áo', status: 'done', date: '2025-12-17' },
  { id: 3, name: 'Lê Văn C', phone: '0987654321', email: 'c@gmail.com', content: 'Tư vấn thiết kế nội thất', status: 'pending', date: '2025-12-19' },
  { id: 4, name: 'Phạm Thị D', phone: '0978123456', email: 'd@gmail.com', content: 'Chọn bàn ăn phù hợp', status: 'done', date: '2025-12-15' },
];

function statusLabel(status) {
  switch (status) {
    case 'pending': return <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Chờ xử lý</span>;
    case 'done': return <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Đã xử lý</span>;
    default: return status;
  }
}

export default function AdminConsulting() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = mockConsults.filter(
    (c) =>
      (status === '' || c.status === status) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-primary">Tư vấn khách hàng</h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            className="border rounded-lg px-4 py-2 w-full max-w-xs focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none shadow-sm"
            placeholder="Tìm kiếm tên, SĐT, email, nội dung..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none shadow-sm bg-white"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {mockStatus.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white p-0 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-primary/10 text-primary uppercase text-xs">
              <th className="px-4 py-3 text-left">Mã</th>
              <th className="px-4 py-3 text-left">Khách hàng</th>
              <th className="px-4 py-3 text-center">SĐT</th>
              <th className="px-4 py-3 text-center">Email</th>
              <th className="px-4 py-3 text-left">Nội dung</th>
              <th className="px-4 py-3 text-center">Ngày gửi</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">Không tìm thấy yêu cầu nào.</td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="bg-white shadow rounded even:bg-gray-50 hover:bg-primary/5 transition">
                  <td className="px-4 py-2 font-semibold text-gray-700">{c.id}</td>
                  <td className="px-4 py-2 font-medium">{c.name}</td>
                  <td className="px-4 py-2 text-center">{c.phone}</td>
                  <td className="px-4 py-2 text-center">{c.email}</td>
                  <td className="px-4 py-2">{c.content}</td>
                  <td className="px-4 py-2 text-center">{c.date}</td>
                  <td className="px-4 py-2 text-center">{statusLabel(c.status)}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold shadow">Xem</button>
                    {c.status === 'pending' && (
                      <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow">Đánh dấu đã xử lý</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
