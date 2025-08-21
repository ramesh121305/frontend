// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
let storedToken = null;

try {
  const userStr = localStorage.getItem("user");
  if (userStr) storedUser = JSON.parse(userStr);
} catch (err) {
  console.warn("Invalid user in localStorage, clearing it.", err);
  localStorage.removeItem("user");
}

storedToken = localStorage.getItem("token"); // token is just a string, no parse needed

const initialState = {
  user: storedUser,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
