// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';
// import budgetReducer from './slices/budgetSlice';
import vendorReducer from './slices/vendorSlice';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
    user: userReducer,
    events: eventReducer,
    // budget: budgetReducer,
    booking: bookingReducer,
  },
});

export default store; // Exporting the store correctly
