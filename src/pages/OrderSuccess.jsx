// src/pages/OrderSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId, total, address, payment } = location.state || {};

  if (!orderId) {
    return (
      <div className="container mt-5 text-center">
        <h2>⚠️ No order found</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-lg">
        <h2 className="text-success">🎉 Order Placed Successfully!</h2>
        <p className="mt-3">Thank you for your purchase.</p>
        <h5 className="mt-3">Order ID: <strong>{orderId}</strong></h5>
        <h5>Total Paid: ₹{total}</h5>

        <div className="mt-4 text-start">
          <h6>📍 Delivery Address</h6>
          <p>
            {address?.fullName}, {address?.phone} <br />
            {address?.line1} {address?.line2 && `, ${address.line2}`} <br />
            {address?.city} - {address?.pincode}
          </p>
        </div>

        <div className="mt-3">
          <h6>💳 Payment Method</h6>
          <p>{payment?.method.toUpperCase()}</p>
        </div>

        <div className="mt-4">
          <Link to="/my-orders" className="btn btn-primary me-2">
            View My Orders
          </Link>
          <Link to="/" className="btn btn-outline-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
