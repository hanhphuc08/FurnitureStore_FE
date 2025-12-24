import { useEffect, useState, useMemo } from "react";
// import { getOrders } from "../api/ordersApi";
import MainHeader from "../components/layout/MainHeader.jsx";
import MainFooter from "../components/layout/MainFooter.jsx";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8686/api/orders/my", { credentials: "include" });
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (!res.ok) {
          throw new Error("Không thể tải danh sách đơn hàng");
        }
        const data = await res.json();
        // Đảm bảo data là array
        setOrders(Array.isArray(data) ? data : data?.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const filteredOrders = useMemo(() => {
    if (filterStatus === "Tất cả") return orders;
    return orders.filter(order => order.status === filterStatus);
  }, [orders, filterStatus]);

  const orderStats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === "Đã giao").length;
    const inTransit = orders.filter(o => o.status === "Đang giao").length;
    const cancelled = orders.filter(o => o.status === "Đã hủy").length;
    const totalValue = orders.reduce((sum, o) => sum + o.total, 0);
    return { total, delivered, inTransit, cancelled, totalValue };
  }, [orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao": return "bg-green-100 text-green-800 border-green-200";
      case "Đang giao": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Đã hủy": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewDetails = (order) => {
    // Navigate to order details page using numeric orderId
    const orderId = order.orderId || order.id;
    window.location.href = `/orders/${orderId}`;
  };

  const handleContactSupport = (order) => {
    // TODO: Open support chat or email
    const orderId = order.orderId || order.id;
    console.log("Contact support for order:", orderId);
  };

  if (loading) {
    return (
      <div className="bg-background-light text-text-light min-h-screen font-display dark:bg-background-dark dark:text-text-dark">
        <MainHeader />
        <main className="flex flex-col">
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
              <p>Đang tải đơn hàng...</p>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light text-text-light min-h-screen font-display dark:bg-background-dark dark:text-text-dark">
        <MainHeader />
        <main className="flex flex-col">
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl text-red-400">
                  error
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-600 mb-2 dark:text-gray-400">
                Không thể tải đơn hàng
              </h2>
              <p className="text-gray-500 mb-6 dark:text-gray-500">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-block rounded-lg bg-primary px-6 py-3 font-bold text-white transition hover:scale-105 hover:shadow-lg"
              >
                Thử lại
              </button>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="bg-background-light text-text-light min-h-screen font-display dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="flex flex-col">
        {/* BREADCRUMB */}
        <section className="border-b bg-white/50 py-4 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" className="text-gray-500 hover:text-primary transition">
                    Trang chủ
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-gray-400 text-sm mx-2">
                    chevron_right
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Đơn hàng của tôi
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* HEADER */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-black text-text-light md:text-5xl">
                Đơn hàng của tôi
              </h1>
              <p className="mt-4 text-lg text-text-light/80">
                Theo dõi và quản lý các đơn hàng của bạn
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                    <span className="material-symbols-outlined text-blue-600">
                      shopping_bag
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tổng đơn</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {orderStats.total}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                    <span className="material-symbols-outlined text-green-600">
                      check_circle
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Đã giao</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {orderStats.delivered}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900">
                    <span className="material-symbols-outlined text-yellow-600">
                      local_shipping
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Đang giao</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {orderStats.inTransit}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                    <span className="material-symbols-outlined text-red-600">
                      cancel
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Đã hủy</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {orderStats.cancelled}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-6 border-b bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Lọc theo trạng thái:
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Đã giao">Đã giao</option>
                  <option value="Đang giao">Đang giao</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị {filteredOrders.length} đơn hàng
              </div>
            </div>
          </div>
        </section>

        {/* ORDERS LIST */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <span className="material-symbols-outlined text-6xl text-gray-400">
                    shopping_bag
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-600 mb-2 dark:text-gray-400">
                  {filterStatus === "Tất cả" ? "Chưa có đơn hàng nào" : `Không có đơn hàng ${filterStatus.toLowerCase()}`}
                </h2>
                <p className="text-gray-500 mb-6 dark:text-gray-500">
                  Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên của bạn.
                </p>
                <a
                  href="/products"
                  className="inline-block rounded-lg bg-primary px-6 py-3 font-bold text-white transition hover:scale-105 hover:shadow-lg"
                >
                  Khám phá sản phẩm
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Đơn hàng #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(order.status)}`}
                        >
                          <span className="material-symbols-outlined text-sm mr-1">
                            {order.status === "Đã giao" ? "check_circle" :
                             order.status === "Đang giao" ? "local_shipping" : "cancel"}
                          </span>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4 lg:mt-0">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
                        >
                          Xem chi tiết
                        </button>
                        <button
                          onClick={() => handleContactSupport(order)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition"
                        >
                          Liên hệ hỗ trợ
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Chi tiết sản phẩm ({order.items.length} sản phẩm)
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                × {item.quantity}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-6 pt-4 flex justify-between items-center dark:border-gray-700">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Tổng tiền:
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default OrdersPage;