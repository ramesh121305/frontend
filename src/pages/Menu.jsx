// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import DishCard from "../components/DishCard";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get("/menu");
        setDishes(res.data);
      } catch (err) {
        // fallback 21 dishes
        setDishes([
          { _id: "1", name: "Paneer Tikka", price: 199, isVeg: true, category: "Starters", image: "images/Paneer-Tikka-Featured-1.jpg" },
          { _id: "2", name: "Spring Rolls", price: 129, isVeg: true, category: "Starters", image: "images/VEG-SPRING-ROLL.avif" },
          { _id: "3", name: "Veg Pakora", price: 99, isVeg: true, category: "Starters", image: "images/images (1).jpg" },
          { _id: "4", name: "Chicken Tikka", price: 229, isVeg: false, category: "Starters", image: "images/maxresdefault.jpg" },
          { _id: "5", name: "Fish Fry", price: 249, isVeg: false, category: "Starters", image: "images/IMG_2580-1.jpg" },
          { _id: "6", name: "Mutton Seekh Kebab", price: 279, isVeg: false, category: "Starters", image: "images/mutton-seekh-kebab-16903020023x2.webp" },
          { _id: "7", name: "Veg Biryani", price: 179, isVeg: true, category: "Meals", image: "images/360_F_982716634_04UFwbDpbgF083Yoc7B0PrXPlQLMDjJW.jpg" },
          { _id: "8", name: "Paneer Butter Masala", price: 199, isVeg: true, category: "Meals", image: "images/Paneer-Butter-Masala.jpg" },
          { _id: "9", name: "Dal Makhani", price: 149, isVeg: true, category: "Meals", image: "images/360_F_906553984_03mN4Fu8i1NYmCDuUbfCxUzLRKOd32la.jpg" },
          { _id: "10", name: "Chicken Biryani", price: 249, isVeg: false, category: "Meals", image: "images/360_F_912102578_dpR2r8IstjbBzQWgn2dAegf6SE2gDPNT.jpg" },
          { _id: "11", name: "Butter Chicken", price: 269, isVeg: false, category: "Meals", image: "images/360_F_601416862_AfYdeefqT1kGqWTx1DZCsJZVzYIDFzPR.jpg" },
          { _id: "12", name: "Mutton Curry", price: 299, isVeg: false, category: "Meals", image: "images/360_F_390294136_VguOWSfQzueKagqq3SWqK1P8fubMhn02.jpg" },
          { _id: "13", name: "Veg Burger", price: 149, isVeg: true, category: "Snacks", image: "images/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg" },
          { _id: "14", name: "French Fries", price: 99, isVeg: true, category: "Snacks", image: "images/ai-generated-freshly-fried-gourmet-french-fries-a-crunchy-and-unhealthy-snack-generated-by-ai-photo.jpg" },
          { _id: "15", name: "Cheese Sandwich", price: 129, isVeg: true, category: "Snacks", image: "images/180b4a8cdc19f5ed90caee9882a0837d.jpg" },
          { _id: "16", name: "Chicken Burger", price: 179, isVeg: false, category: "Snacks", image: "images/658e02cda7939e42519065e9_6584c1ed00a3c9810932e955_airfryerchickensandwich_youtube_dad_2.webp" },
          { _id: "17", name: "Egg Sandwich", price: 119, isVeg: false, category: "Snacks", image: "images/istockphoto-486848138-612x612.jpg" },
          { _id: "18", name: "Chicken Wrap", price: 159, isVeg: false, category: "Snacks", image: "images/fried-chicken-wraps-nuggets-fresh-600nw-2496519981.webp" },
          { _id: "19", name: "Gulab Jamun", price: 79, isVeg: true, category: "Desserts", image: "images/360_F_1331870141_3OFDclDKJ7dR9pF7qJYV4MORP4lo3SIE.jpg" },
          { _id: "20", name: "Ice Cream Sundae", price: 99, isVeg: true, category: "Desserts", image: "images/360_F_624690416_kRz95cRlFIi8P4U6Xaj7yGvl1C0XRMvg.jpg" },
          { _id: "21", name: "Cold Coffee", price: 89, isVeg: true, category: "Drinks", image: "images/360_F_316014817_EC1KN7mAD86ALYhhwGUUeSsQoJIVMtfQ.jpg" },
        ]);
      }

      // load saved cart
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
    load();
  }, []);

  // Add or increment dish
  const addToCart = (item) => {
    const existing = cart.find((c) => c._id === item._id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((c) =>
        c._id === item._id ? { ...c, qty: c.qty + 1 } : c
      );
    } else {
      updatedCart = [...cart, { ...item, qty: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrement dish
  const decrementCart = (item) => {
    const updatedCart = cart
      .map((c) => (c._id === item._id ? { ...c, qty: c.qty - 1 } : c))
      .filter((c) => c.qty > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const placeOrder = () => {
    const user = localStorage.getItem("token");
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  // filter + search
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "veg") return dish.isVeg && matchesSearch;
    if (filter === "nonveg") return !dish.isVeg && matchesSearch;
    if (filter === "starters") return dish.category === "Starters" && matchesSearch;
    if (filter === "desserts") return dish.category === "Desserts" && matchesSearch;
    if (filter === "drinks") return dish.category === "Drinks" && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="container py-4">
      {/* Search */}
      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search dishes..."
          style={{ border: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        />
      </div>

      {/* Filter buttons */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className={`btn btn-sm ${filter === "all" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setFilter("all")}>All</button>
        <button className={`btn btn-sm ${filter === "veg" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("veg")}>Veg</button>
        <button className={`btn btn-sm ${filter === "nonveg" ? "btn-danger" : "btn-outline-danger"}`} onClick={() => setFilter("nonveg")}>Non-Veg</button>
        <button className={`btn btn-sm ${filter === "starters" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFilter("starters")}>Starters</button>
        <button className={`btn btn-sm ${filter === "desserts" ? "btn-warning" : "btn-outline-warning"}`} onClick={() => setFilter("desserts")}>Desserts</button>
        <button className={`btn btn-sm ${filter === "drinks" ? "btn-info" : "btn-outline-info"}`} onClick={() => setFilter("drinks")}>Drinks</button>
      </div>

      {/* Dish list */}
      <div className="row">
        {filteredDishes.map((dish) => {
          const cartItem = cart.find((c) => c._id === dish._id);
          const qty = cartItem ? cartItem.qty : 0;

          return (
            <div key={dish._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <DishCard dish={dish}>
                <div className="mt-2 text-center">
                  {qty === 0 ? (
                    <button className="btn btn-sm btn-success w-100" onClick={() => addToCart(dish)}>
                      Add
                    </button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center border rounded p-1">
                      <button className="btn btn-sm btn-danger" onClick={() => decrementCart(dish)}>-</button>
                      <span className="px-2">{qty}</span>
                      <button className="btn btn-sm btn-success" onClick={() => addToCart(dish)}>+</button>
                    </div>
                  )}
                </div>
              </DishCard>
            </div>
          );
        })}
      </div>

      {/* Cart summary */}
      {cart.length > 0 && (
        <div className="mt-4 text-center">
          <h4>Cart Items: {cart.reduce((sum, item) => sum + item.qty, 0)}</h4>
          <button className="btn btn-success" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
