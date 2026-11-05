import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetailsApi } from "./api/auth";

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserDetailsApi()
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch user details"
            );
        }
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;