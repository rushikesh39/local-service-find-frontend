// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let user = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    user = {
      id:decoded.userId,
      email: decoded.email, // assuming backend includes 'email' in token
      name:decoded.name,
      role: decoded.role,
      token: token,
    };
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem("token");
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = {
        email: action.payload.email,
        name: action.payload.name,
        role: action.payload.role,
        token: action.payload.token,
      };
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isLoggedIn", "true");
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
