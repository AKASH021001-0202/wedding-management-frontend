// src/api/forgetPassword.js

import axios from 'axios';

const ForgetURL = `${import.meta.env.VITE_BACKEND_URL}/forget-password`;

const forgetPassword = async (email) => {
  try {
    const response = await axios.post(ForgetURL, { email });
    return response.data.message;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error sending reset email');
    }
  }
};

export default forgetPassword;
