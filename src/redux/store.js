// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import Booking from "../Pages/Booking";
import bookingReducer from "./bookingSlice";
import userReducer from '../redux/userSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    booking:bookingReducer,
    user:userReducer
  },
});

export default store;
