import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";
import QRCode from "react-qr-code";

const BASE_URL = "http://localhost:8686";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function MockVnpayPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // countdown 10 phút (demo)
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  const [selectedBank, setSelectedBank] = useState("VCB");

  const banks = useMemo(
    () => [
      { code: "VCB", name: "Vietcombank" },
      { code: "TCB", name: "Techcombank" },
      { code: "ACB", name: "ACB" },
      { code: "BIDV", name: "BIDV" },
      { code: "MB", name: "MB Bank" },
    ],
    []
  );

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/mock-payment/order/${orderId}`, {
          credentials: "include",
        });

        if (res.status === 401) return navigate("/login");
        if (!res.ok) throw new Error("ORDER_NOT_FOUND");

        const data = await res.json();
        setOrderInfo(data);
      } catch (e) {
        console.error(e);
        setOrderInfo({ orderId: Number(orderId), total: 0, status: "PENDING", paymentStatus: "UNPAID" });
      } finally {
        setLoading(false);
      }
    };
    loadOrderInfo();
  }, [orderId, navigate]);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch {
      // ignore clipboard errors (e.g., permission denied, unsupported)
    }
  };

  const callPayment = async (type) => {
    try {
      setPaying(true);
      const res = await fetch(`${BASE_URL}/api/mock-payment/${type}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: Number(orderId), bankCode: selectedBank }),
      });

      if (res.status === 401) return navigate("/login");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "PAY_FAILED");

      if (type === "success") navigate(`/order-success/${orderId}`);
      else navigate(`/payment-fail`);
    } catch (err) {
      console.error(err);
      alert("Không thể xử lý thanh toán mock. Vui lòng thử lại.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
        <MainHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="rounded-2xl bg-white p-6 shadow-sm w-full max-w-md text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-gray-600">Đang tải thông tin thanh toán...</p>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }

  const qrValue = `VNPAY|order=${orderId}|amount=${orderInfo?.total || 0}|bank=${selectedBank}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#333333] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black">Thanh toán VNPay</h1>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Vui lòng hoàn tất thanh toán để xác nhận đơn hàng.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Pill className="bg-blue-100 text-blue-700">Phiên: {mm}:{ss}</Pill>
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              Quay lại
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          {/* Left */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">Mã đơn hàng</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="text-xl font-extrabold">#{orderInfo?.orderId}</div>
                  <button
                    onClick={() => copyText(orderInfo?.orderId)}
                    className="rounded-lg border px-3 py-1 text-xs font-semibold hover:bg-gray-50"
                    title="Copy"
                  >
                    Copy
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">Số tiền cần thanh toán</div>
                <div className="mt-1 text-3xl font-black text-blue-700">
                  {formatCurrency(orderInfo?.total)}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill className="bg-gray-100 text-gray-700">
                    Trạng thái đơn: {orderInfo?.status || "PENDING"}
                  </Pill>
                  <Pill className="bg-gray-100 text-gray-700">
                    Thanh toán: {orderInfo?.paymentStatus || "UNPAID"}
                  </Pill>
                </div>
              </div>

              <div className="rounded-2xl border bg-gray-50 p-4">
                <div className="text-center text-xs font-semibold text-gray-600 mb-2">
                  Mã QR thanh toán
                </div>
                <div className="rounded-xl bg-white p-3">
                  <QRCode value={qrValue} size={180} />
                </div>
                <div className="mt-3 text-center text-xs text-gray-500">
                  Quét mã QR để thanh toán
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold">Chọn phương thức thanh toán</div>
                  <div className="text-xs text-gray-500">Chọn ngân hàng để thanh toán</div>
                </div>

                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold"
                >
                  {banks.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name} ({b.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  disabled={paying || secondsLeft === 0}
                  onClick={() => callPayment("success")}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {paying ? "Đang xử lý..." : "✅ Xác nhận thanh toán"}
                </button>

                <button
                  disabled={paying}
                  onClick={() => callPayment("fail")}
                  className="rounded-xl border bg-white px-5 py-3 font-bold text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                >
                  ❌ Hủy thanh toán
                </button>
              </div>

              {secondsLeft === 0 && (
                <div className="mt-3 text-sm text-red-600">
                  Phiên thanh toán đã hết hạn. Vui lòng quay lại và tạo phiên mới.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}

export default MockVnpayPage;
