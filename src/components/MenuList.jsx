import React from "react";
import useFetchMenu from "../hooks/useFetchMenu"; // ✅ Correct relative path to your hook

const MenuList = () => {
  const { menu, loading, error } = useFetchMenu("http://localhost:5000/api/menu");

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {menu.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          {/* Text */}
          <div style={{ padding: "10px" }}>
            <h3 style={{ margin: "0 0 10px" }}>{item.name}</h3>
            {/* Removed price display if you don’t want it */}
            {/* <p style={{ margin: 0, fontWeight: "bold" }}>{item.price} ₹</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
