import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBoxOpen, FaHourglassHalf } from "react-icons/fa";

export default function OrderTracking() {
  const loc = useLocation();

  // Sample order data
  const orders = [
    {
      id: "#1001",
      items: ["Pizza", "Burger", "Coke"],
      status: "pending", // pending, preparing, out_for_delivery, delivered
    },
    {
      id: "#1002",
      items: ["Pasta", "Salad"],
      status: "out_for_delivery",
    },
  ];

  const steps = ["pending", "preparing", "out_for_delivery", "delivered"];

  // Map each step to its icon
  const stepIcons = {
    pending: <FaHourglassHalf className="text-warning me-2" />,
    preparing: <FaBoxOpen className="text-warning me-2" />,
    out_for_delivery: <FaTruck className="text-warning me-2" />,
    delivered: <FaTimesCircle className="text-muted me-2" />,
  };

  // Function to get proper icon based on order status
  const statusIcon = (orderStatus, stepName) => {
    const stepsOrder = ["pending", "preparing", "out_for_delivery", "delivered"];
    const currentIndex = stepsOrder.indexOf(orderStatus);
    const stepIndex = stepsOrder.indexOf(stepName);

    if (stepIndex < currentIndex) return <FaCheckCircle className="text-success me-2" />;
    if (stepIndex === currentIndex) return stepIcons[stepName];
    return <FaTimesCircle className="text-muted me-2" />;
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Your Orders</h2>

      {loc.state?.message && (
        <div className="alert alert-success text-center">{loc.state.message}</div>
      )}

      {orders.length === 0 && (
        <p className="text-center text-muted">No orders yet. Browse the menu to place your first order!</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="card shadow-lg mb-4 p-4"
          style={{ borderRadius: "15px" }}
        >
          <h5 className="fw-bold mb-3">Order {order.id}</h5>

          <p className="mb-3">
            <strong>Items:</strong> {order.items.join(", ")}
          </p>

          {/* Timeline */}
          <div className="timeline">
            {steps.map((step) => (
              <div key={step} className="d-flex align-items-center mb-2">
                {statusIcon(order.status, step)}
                <span
                  className={
                    ["pending", "preparing", "out_for_delivery", "delivered"].indexOf(step) <=
                    ["pending", "preparing", "out_for_delivery", "delivered"].indexOf(order.status)
                      ? "fw-bold text-success"
                      : "text-muted"
                  }
                >
                  {step.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
