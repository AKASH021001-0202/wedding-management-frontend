// src/redux/slices/budgetSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  budgets: [],
  status: 'idle',
  error: null,
};

export const fetchBudgets = createAsyncThunk('budget/fetchBudgets', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/budgets`); // Adjust API endpoint as per your backend setup
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const addBudget = createAsyncThunk('budget/addBudget', async (newBudget) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/budgets`, newBudget); // Adjust API endpoint
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});



export const deleteBudget = createAsyncThunk('budget/deleteBudget', async (budgetId) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/budgets/${budgetId}`); // Adjust API endpoint
    return budgetId;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});
export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async ({ id, bookingData }, thunkAPI) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets = action.payload;
        state.error = null;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets.push(action.payload);
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets = state.budgets.map((budget) =>
          budget._id === action.payload._id ? action.payload : budget
        );
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets = state.budgets.filter((budget) => budget._id !== action.payload);
        state.error = null;
      });
  },
});

export default budgetSlice.reducer;
