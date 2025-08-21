import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../utils/helpers";
import { FaShoppingCart } from "react-icons/fa";

export default function DishCard({ dish }) {
  const { cart, addToCart, incrementQty, decrementQty } = useCart();
  const img = dish.image || `images/images (1).jpg`;

  // check if dish already in cart
  const cartItem = cart.find((item) => item._id === dish._id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="card mb-4 shadow-sm">
      <img
        src={img}
        className="card-img-top"
        style={{ height: 180, objectFit: "cover" }}
        alt={dish.name}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{dish.name}</h5>
          <span
            className={`badge ${dish.isVeg ? "badge-veg" : "badge-nonveg"}`}
          >
            {dish.isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>
        <p className="card-text small text-muted">{dish.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <strong>{formatCurrency(dish.price)}</strong>

          {/* buttons side by side */}
          <div className="d-flex align-items-center gap-2">
            {/* View Button with colorful style */}
            <Link
              to={`/dish/${dish._id}`}
              className="btn btn-sm text-white fw-bold"
              style={{
                background: "linear-gradient(45deg, #ff416c, #ff4b2b, #ff6a00)",
                border: "none",
                boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
              }}
            >
              View
            </Link>

            {/* If qty > 0 show - qty + else show Add to Cart */}
            {qty > 0 ? (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => decrementQty(dish._id)}
                >
                  -
                </button>
                <span className="mx-2 fw-bold">{qty}</span>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => incrementQty(dish._id)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-dark d-flex align-items-center"
                onClick={() => addToCart(dish)}
              >
                <FaShoppingCart className="me-1" /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
