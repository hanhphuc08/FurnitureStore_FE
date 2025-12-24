import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import HomePage from "./pages/Home.jsx";
import ProductListPage from "./pages/ProductList.jsx";
import ProductDetailPage from "./pages/ProductDetail.jsx";
import CartPage from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import OrderSuccessPage from "./pages/OrderSuccess.jsx";
import PaymentFailPage from "./pages/PaymentFail.jsx";
import MockVnpayPage from "./pages/MockVnpayPage.jsx";
import BankPaymentPage from "./pages/BankPaymentPage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import ConsultingPage from "./pages/Consulting.jsx";
import OrdersPage from "./pages/Orders.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminConsulting from "./pages/admin/AdminConsulting.jsx";

function App() {
  // Bước 3: Truyền authVersion
  const [authVersion, setAuthVersion] = useState(0);

  const handleLogin = () => setAuthVersion((v) => v + 1);
  const handleLogout = () => setAuthVersion((v) => v + 1);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="/payment-fail" element={<PaymentFailPage />} />
        <Route path="/mock-vnpay/:orderId" element={<MockVnpayPage />} />
        <Route path="/bank-payment/:orderId" element={<BankPaymentPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/consulting" element={<ConsultingPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
        <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="consulting" element={<AdminConsulting />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatbotWidget authVersion={authVersion} />
    </BrowserRouter>
  );
}
export default App;
