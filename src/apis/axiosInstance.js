import axios from 'axios';

// Function to get JWT token from localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
