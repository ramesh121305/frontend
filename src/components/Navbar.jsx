import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // Show alert when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    // Close dropdown manually
    document.body.click();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning text-dark shadow-sm fixed-top">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/images/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg"
              alt="FoodExpress logo"
              height="46"
              style={{ marginRight: 8 }}
            />
            <h3 className="text-black ms-3 mb-0">
              <strong>FoodExpress</strong>
            </h3>
          </Link>

          <div className="d-flex align-items-center">
            {/* Show Menu only if logged in */}
            {user && (
              <Link to="/menu" className="me-3 nav-link fw-bold">
                Menu
              </Link>
            )}

            {/* View Cart always visible */}
            <Link
              to="/cart"
              className="btn btn-outline-dark position-relative me-3"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </Link>

            {/* User account */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <FaUser className="me-2" />
                  {user.name || "Account"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-primary me-2">
                  <b>Login</b>
                </Link>
                <Link to="/register" className="btn btn-success">
                  <b>Register</b>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Alert for item added to cart */}
      {showAlert && (
        <div
          className="alert alert-success position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          Item added to cart!
        </div>
      )}
    </>
  );
}
