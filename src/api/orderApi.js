// src/api/orderApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-ooew.onrender.com/api/orders", // your backend URL
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // token stored after login
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Fetch all orders of logged-in user
export const getMyOrders = () => API.get("/my");

// Fetch single order by ID
export const getOrderById = (id) => API.get(`/${id}`);
