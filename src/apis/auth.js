import axios from 'axios';
// import { setUser } from './userSlice'; 

const userRegisterdata = async (formData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/registers`, formData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

const userLogindata = async (formData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response?.data || error.message);
    throw error;
  }
};
export const refreshToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const response = await axios.post('/refresh-token'); // Example endpoint to refresh token
    const newToken = response.data.token;
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};



export { userRegisterdata, userLogindata};
