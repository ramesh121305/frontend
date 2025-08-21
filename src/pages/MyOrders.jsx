// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MyOrders() {
  const { token } = useAuth();   // ✅ get token from AuthContext
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view your orders.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // ✅ attach token
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data); // ✅ backend should return array of orders
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center mt-5">Loading your orders...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item">
              <h5>Order ID: {order._id}</h5>
              <p>Status: <strong>{order.status}</strong></p>
              <ul>
                {order.orderItems.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.qty} × ₹{item.price}
                  </li>
                ))}
              </ul>
              <p>Total: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
