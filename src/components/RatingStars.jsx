import React from "react";

const RatingStars = ({ rating, onRate }) => {
  const handleClick = (value) => {
    onRate(value);
  };

  return (
    <div style={{ fontSize: "1.5rem", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            color: star <= rating ? "#FFD700" : "#ccc",
            marginRight: 4
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
