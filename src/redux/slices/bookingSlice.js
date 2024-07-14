
// bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthToken = () => localStorage.getItem('token');

const axiosInstance = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBookingPlan = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      const response = await axiosInstance().post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBookingWithId = createAsyncThunk(
  'booking/createBookingWithId',
  async ({ event_id, bookingData }, thunkAPI) => {
    try {
      const response = await axiosInstance().post(`/bookings/${event_id}`, bookingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchbookingsPlan = createAsyncThunk(
  'booking/fetchbookings',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance().get('/bookings');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchBookingById = createAsyncThunk(
  'booking/fetchBookingById',
  async (user_id, thunkAPI) => {
    try {
      const response = await axiosInstance().get(`/bookings/${user_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBookingByIdEdit = createAsyncThunk(
  'booking/fetchBookingByIdEdit',
  async (_id, thunkAPI) => {
    try {
      const response = await axiosInstance().get(`/bookings/edit/${_id}`);
      return response.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBookingPlan = createAsyncThunk(
  'booking/updateBooking',
  async ({ id, bookingData }, thunkAPI) => {
    try {
      const response = await axiosInstance().put(`/bookings/${id}`, bookingData);
      return response.data;
   
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBookingPlan = createAsyncThunk(
  'booking/deleteBooking',
  async (id, thunkAPI) => {
    try {
      await axiosInstance().delete(`/bookings/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingslice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    selectedBooking: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchbookingsPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchbookingsPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(fetchbookingsPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingByIdEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingByIdEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
        state.error = null;
      })
      .addCase(fetchBookingByIdEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBookingWithId.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookingWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.error = null;
      })
      .addCase(createBookingWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
        state.error = null;
      })
      .addCase(updateBookingPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBookingPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookingPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteBookingPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingslice.reducer;