// src/pages/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Cart() {
  const { cart, incrementQty, decrementQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const itemCount = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const subtotal = cart.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = 0;
  const total = subtotal + tax + delivery;

  const goCheckout = () => {
    if (!user) return navigate("/login");
    navigate("/checkout");
  };

  if (!cart.length) {
    return (
      <div className="container text-center py-5">
        <div className="card p-5">
          <h3 className="mb-3">Your cart is empty</h3>
          <p className="text-muted">Add something tasty to get started!</p>
          <Link to="/menu" className="btn btn-primary btn-lg mt-2">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container py-4">
      {/* Cart Items */}
      <div className="card p-3 p-md-4 mb-4">
        {cart.map((it) => (
          <div
            key={it.id}
            className="cart-item border-bottom py-3 d-flex align-items-center"
            style={{ gap: "1rem" }}
          >
            <img
              src={it.image}
              alt={it.name}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            />

            <div className="flex-grow-1">
              <h5 className="mb-1">{it.name}</h5>
              <div className="text-muted small">
                {it.isVeg ? "Veg" : "Non-Veg"} • {it.category || "Item"}
              </div>
              <div className="text-success fw-bold mt-1">
                ₹{it.price * (it.qty || 1)}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="qty-group d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decrementQty(it.id)}
              >
                −
              </button>
              <span className="mx-2">{it.qty || 1}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => incrementQty(it.id)}
              >
                +
              </button>
            </div>

            {/* Remove Item */}
            <button
              className="btn btn-link text-danger ms-3"
              onClick={() => removeFromCart(it.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-center pt-3">
          <button className="btn btn-outline-danger" onClick={clearCart}>
            Clear Cart
          </button>
          <Link to="/menu" className="btn btn-outline-primary">
            Add more items
          </Link>
        </div>
      </div>

      {/* Order Summary */}
      <div className="card p-4 summary-card mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="mb-3">Order Summary</h4>

        <div className="d-flex justify-content-between">
          <span>Items</span>
          <strong>{itemCount}</strong>
        </div>
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery</span>
          <span className="text-success">Free</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* Checkout Button */}
        <button className="btn btn-success btn-lg w-100 mt-3" onClick={goCheckout}>
          {user ? "Proceed to Checkout" : "Login to Checkout"}
        </button>
      </div>
    </div>
  );
}
