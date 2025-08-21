import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishPage from './pages/DishPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from "./pages/OrderSuccess";

import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ManageMenu from './admin/ManageMenu';
import Orders from './admin/Orders';
import MyOrders from "./pages/MyOrders";
import { useAuth } from './contexts/AuthContext';

// simple protected route for user
function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// admin protected (very simple)
function AdminProtected({ children }) {
  const { user } = useAuth();
  if (!user || !user.isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/orders" element={<Protected><OrderTracking /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
           <Route path="/orders" element={<MyOrders />} />
           <Route path="/order-success" element={<OrderSuccess />} />

          {/* Admin area */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtected><AdminLayout /></AdminProtected>}>
            <Route index element={<Dashboard />} />
            <Route path="manage-menu" element={<ManageMenu />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="*" element={<h2 className="text-center mt-5">404 — Page not found</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
