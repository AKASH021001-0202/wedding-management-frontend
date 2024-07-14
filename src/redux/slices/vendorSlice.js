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

export const updateUserRoleToVendor = (userId) => async (dispatch) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/vendors/${userId}/vendors`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(setVendor(response.data)); // Assuming you intended to update vendor state
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

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
      state.vendor = action.payload; // Corrected to set vendor state
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
      // Add similar cases for other async thunks as needed
      .addCase(addVendor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update state as necessary after adding a vendor
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      // Repeat for updateVendor, fetchVendorById, deleteVendor, etc.
  },
});

export const { setVendor } = vendorSlice.actions;

export default vendorSlice.reducer;
