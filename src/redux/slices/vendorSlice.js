import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

export const fetchVendors = createAsyncThunk('vendors/fetchVendors', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendors`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const AllfetchVendors = createAsyncThunk('vendors/AllfetchVendors', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendors/all`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addVendor = createAsyncThunk('vendors/addVendor', async (newVendor, thunkAPI) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendors`, newVendor, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateVendor = createAsyncThunk('vendors/updateVendor', async (updatedVendor, thunkAPI) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/vendors/${updatedVendor._id}`, updatedVendor, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchVendorById = createAsyncThunk('vendors/fetchVendorById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vendors/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteVendor = createAsyncThunk('vendors/deleteVendor', async (id, thunkAPI) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found');

    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/vendors/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    vendors: [],
    vendor: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(AllfetchVendors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AllfetchVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendors = action.payload;
      })
      .addCase(AllfetchVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addVendor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendors.push(action.payload);
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateVendor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.vendors.findIndex(vendor => vendor._id === action.payload._id);
        if (index !== -1) {
          state.vendors[index] = action.payload;
        }
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchVendorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendor = action.payload;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteVendor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendors = state.vendors.filter(vendor => vendor._id !== action.payload);
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setVendor } = vendorSlice.actions;

export default vendorSlice.reducer;
