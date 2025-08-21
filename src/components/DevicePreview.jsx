import React from "react";

const DevicePreview = ({ rating }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
      <h3>Device Preview</h3>
      <p>Your current rating: {rating} / 5</p>
      <div style={{ fontSize: "1.5rem", color: "#FFD700" }}>
        {"★".repeat(rating) + "☆".repeat(5 - rating)}
      </div>
    </div>
  );
};

export default DevicePreview;
