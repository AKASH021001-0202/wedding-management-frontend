// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateUserRoleToVendor } from '../../apis/userAction';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearUser(state) {
      state.token = null;
      state.user = null;
      // Optionally clear other user details as needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserRoleToVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRoleToVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user with new role data
      })
      .addCase(updateUserRoleToVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, logout, clearUser } = userSlice.actions;
export default userSlice.reducer;
