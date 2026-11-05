// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state, action) => {
      return initialState;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
