import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import RatingStars from "./components/RatingStars";
import DevicePreview from "./components/DevicePreview";
import MenuList from "./components/MenuList"; // ✅ Use the external component

// Rating & Preview Section
const RatingAndPreview = () => {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Rate & Preview</h2>
      <RatingStars rating={rating} onRate={setRating} />
      <DevicePreview rating={rating} />
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Your app routes */}
          <AppRoutes />

          {/* Correct MenuList */}
          <MenuList />
          <RatingAndPreview />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
