import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";
import {
  getMyCart,
  updateCartItemQty,
  removeCartItem,
} from "../api/cartApi.js";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCart() {
      try {
        const data = await getMyCart();
        setCart(data);
      } catch (e) {
        if (e.message === "UNAUTHORIZED") {
          navigate("/login");
        } else {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, [navigate]);

  async function changeQty(item, qty) {
    if (qty < 1) return;
    const updated = await updateCartItemQty(item.cartItemId, qty);
    setCart(updated);
  }

  async function removeItem(item) {
    const updated = await removeCartItem(item.cartItemId);
    setCart(updated);
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-center">Đang tải giỏ hàng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-10 text-red-600">{error}</div>
      </div>
    );
  }

  const items = cart?.items || [];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#0d1b1b]">
      <MainHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="flex gap-2 text-sm text-gray-500">
          <Link to="/" className="text-primary hover:underline">
            Trang chủ
          </Link>
          <span>/</span>
          <span>Giỏ hàng</span>
        </div>

        <h2 className="mt-4 text-3xl font-black">Giỏ hàng của bạn</h2>

        {items.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-gray-500">Giỏ hàng đang trống</p>
            <Link to="/products" className="mt-4 inline-block text-primary">
              Tiếp tục mua sắm →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* ITEMS */}
            <section className="space-y-6 lg:col-span-2">
              {items.map((item) => (
                <article
                  key={item.cartItemId}
                  className="flex gap-4 rounded-lg border bg-white p-4"
                >
                  <div
                    className="h-28 w-28 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />

                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      to={`/products/${item.slug}`}
                      className="font-bold hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.material || ""} {item.size || ""}
                    </p>
                    <p className="text-sm text-primary">
                      {formatCurrency(item.unitPrice)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2 border rounded-full px-2">
                      <button onClick={() => changeQty(item, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQty(item, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <p className="font-bold">
                      {formatCurrency(item.lineTotal)}
                    </p>

                    <button
                      className="text-red-500"
                      onClick={() => removeItem(item)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </article>
              ))}

              <Link to="/products" className="text-primary hover:underline">
                ← Tiếp tục mua sắm
              </Link>
            </section>

            {/* SUMMARY */}
            <aside>
              <div className="sticky top-28 rounded-lg border bg-white p-6 space-y-4">
                <h3 className="text-xl font-bold">Tổng quan đơn hàng</h3>

                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>

                <div className="border-t" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>

                <button className="w-full rounded-lg bg-primary py-3 font-bold text-white">
                  Tiến hành thanh toán
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}

export default CartPage;
