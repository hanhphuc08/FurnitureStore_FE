import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

function OrderSuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading order info
    // In real app, you would fetch order details from API
    const loadOrderInfo = async () => {
      try {
        // Mock order data - replace with actual API call
        const mockOrder = {
          orderId: parseInt(orderId),
          status: "PENDING",
          paymentStatus: "UNPAID",
          paymentMethod: "COD",
          subtotal: 450000,
          discount: 0,
          shippingFee: 30000,
          total: 480000,
          items: [
            {
              name: "Ghế sofa góc phải",
              quantity: 1,
              unitPrice: 450000,
              lineTotal: 450000
            }
          ],
          shippingInfo: {
            fullName: "Nguyễn Văn A",
            phone: "0123456789",
            address: "123 Đường ABC, Phường XYZ",
            city: "Hồ Chí Minh",
            district: "Quận 1",
            ward: "Phường Bến Nghé"
          },
          createdAt: new Date().toISOString()
        };

        setOrderInfo(mockOrder);
      } catch (error) {
        console.error("Failed to load order:", error);
        // Redirect to home if order not found
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrderInfo();
    } else {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-center">Đang tải thông tin đơn hàng...</div>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-center">
          <p>Không tìm thấy thông tin đơn hàng</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            Về trang chủ →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="material-symbols-outlined text-3xl text-green-600">
                check_circle
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-green-600">Đặt hàng thành công!</h1>
          <p className="mt-2 text-gray-600">
            Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi.
          </p>
          <p className="text-sm text-gray-500">
            Mã đơn hàng: <span className="font-mono font-bold">#{orderInfo.orderId}</span>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Status */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Trạng thái đơn hàng</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Trạng thái:</span>
                  <span className={`font-medium ${
                    orderInfo.status === 'PENDING' ? 'text-yellow-600' :
                    orderInfo.status === 'CONFIRMED' ? 'text-blue-600' :
                    orderInfo.status === 'SHIPPED' ? 'text-purple-600' :
                    orderInfo.status === 'DELIVERED' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {orderInfo.status === 'PENDING' ? 'Chờ xử lý' :
                     orderInfo.status === 'CONFIRMED' ? 'Đã xác nhận' :
                     orderInfo.status === 'SHIPPED' ? 'Đang giao' :
                     orderInfo.status === 'DELIVERED' ? 'Đã giao' :
                     orderInfo.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Thanh toán:</span>
                  <span className={`font-medium ${
                    orderInfo.paymentStatus === 'PAID' ? 'text-green-600' :
                    orderInfo.paymentStatus === 'UNPAID' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {orderInfo.paymentStatus === 'PAID' ? 'Đã thanh toán' :
                     orderInfo.paymentStatus === 'UNPAID' ? 'Chưa thanh toán' :
                     orderInfo.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phương thức:</span>
                  <span className="font-medium">
                    {orderInfo.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' :
                     orderInfo.paymentMethod === 'BANKING' ? 'Chuyển khoản' :
                     orderInfo.paymentMethod === 'MOMO' ? 'Ví MoMo' :
                     orderInfo.paymentMethod}
                  </span>
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Thông tin giao hàng</h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Người nhận:</span> {orderInfo.shippingInfo.fullName}</p>
                <p><span className="font-medium">Số điện thoại:</span> {orderInfo.shippingInfo.phone}</p>
                <p><span className="font-medium">Địa chỉ:</span></p>
                <div className="ml-4 text-gray-600">
                  <p>{orderInfo.shippingInfo.address}</p>
                  <p>{orderInfo.shippingInfo.ward}, {orderInfo.shippingInfo.district}</p>
                  <p>{orderInfo.shippingInfo.city}</p>
                </div>
              </div>
            </section>

            {/* Order Items */}
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Sản phẩm đã đặt</h2>
              <div className="space-y-4">
                {orderInfo.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        SL: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </div>
                    </div>
                    <div className="font-medium">{formatCurrency(item.lineTotal)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <section className="sticky top-28 rounded-xl bg-white p-6 shadow-sm dark:bg-surface-dark">
              <h2 className="mb-4 text-xl font-bold">Tóm tắt đơn hàng</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(orderInfo.subtotal)}</span>
                </div>

                {orderInfo.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatCurrency(orderInfo.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>{orderInfo.shippingFee === 0 ? "Miễn phí" : formatCurrency(orderInfo.shippingFee)}</span>
                </div>

                <div className="border-t pt-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{formatCurrency(orderInfo.total)}</span>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="rounded-xl bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-200">Tiếp theo sẽ xảy ra gì?</h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>✅ Chúng tôi sẽ xác nhận đơn hàng trong vòng 24h</li>
                <li>✅ Sản phẩm sẽ được chuẩn bị và đóng gói cẩn thận</li>
                <li>✅ Bạn sẽ nhận được thông tin vận chuyển qua SMS</li>
                <li>✅ Thời gian giao hàng dự kiến: 3-5 ngày</li>
              </ul>
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                to="/products"
                className="w-full rounded-lg bg-primary py-3 text-center font-bold text-white hover:bg-primary/90"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                to="/"
                className="w-full rounded-lg border border-gray-300 py-3 text-center font-medium hover:bg-gray-50 dark:border-gray-600"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-800/50">
          <h3 className="mb-2 font-bold">Cần hỗ trợ?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Liên hệ với chúng tôi qua hotline: <span className="font-mono">1900 XXX XXX</span> hoặc email:{" "}
            <span className="font-mono">support@furniturestore.com</span>
          </p>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}

export default OrderSuccessPage;