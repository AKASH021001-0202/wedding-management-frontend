import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.user.id; // Assuming the response contains user ID
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
