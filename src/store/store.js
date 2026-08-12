// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookingReducer from "./bookingSlice";
import userReducer from './userSlice'
import servicesReducer from './servicesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    user: userReducer,
    services: servicesReducer,
  },
});

export default store;
