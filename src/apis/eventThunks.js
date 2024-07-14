import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwt-decode

const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
});

  const fetchEventById = createAsyncThunk('events/fetchEventById', async () => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }
  const decoded = jwtDecode(token);
  const id = decoded.id;
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    (response.data);
    return response.data;



  } catch (error) {
    console.error(`Error fetching event with ID ${userId}:`, error.message);
    throw error;
  }
});


const addEvent = createAsyncThunk('events/addEvent', async (eventData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events`, eventData, {
      headers: {
        Authorization: getToken(),
      },
    });
  
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error.message);
    throw error;
  }
});

const updateEvent = createAsyncThunk('events/updateEvent', async (eventData, { rejectWithValue }) => {
 
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/${eventData._id}`, eventData);

    return response.data.event;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    
    return id;
  } catch (error) {
    console.error('Error deleting event:', error.message);
    throw error;
  }
});

export { fetchEvents, fetchEventById, addEvent, updateEvent, deleteEvent };
