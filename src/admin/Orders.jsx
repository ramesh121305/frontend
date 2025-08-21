import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiClient.get("/orders/my");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h4>My Orders</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="card p-3 mb-2" key={order._id}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>Order #{order._id.slice(-4)}</strong>
                <div className="small text-muted">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="mt-1">
                  <strong>Items:</strong>{" "}
                  {order.items.map((i) => i.dish?.name).join(", ")}
                </div>
              </div>
              <div className="text-end">
                <div>
                  <span className="badge bg-warning">{order.status}</span>
                </div>
                <div className="mt-1">₹{order.totalAmount}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
