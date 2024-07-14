import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, addEvent, updateEvent, deleteEvent, fetchEventById } from '../../apis/eventThunks';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentUserId: null, // Assuming you may track the current user ID if needed
  },
  reducers: {
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming fetchEventById will update the state with the fetched event
        state.items = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex((event) => event._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message;
      });

  },
});

export const { setCurrentUserId } = eventSlice.actions;

export default eventSlice.reducer;
