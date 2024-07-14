import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserRoleToVendor = createAsyncThunk(
  'user/updateUserRoleToVendor',
  async (_, { getState, rejectWithValue }) => {
    try {
        
      const { _id } = getState().auth.user._id; // Ensure the _id is correctly retrieved
     
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${_id}/vendor`, {
        is_vendor: true,
      });
      return response.data.user;
    } catch (error) {
      console.error('Error in updateUserRoleToVendor:', error);
      return rejectWithValue(error.response.data);
    }
  }
);
