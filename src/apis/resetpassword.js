// src/api/forgetPassword.js

import axios from 'axios';

const ResetURL = `${import.meta.env.VITE_BACKEND_URL}/reset-password`;

 const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(ResetURL, {
      token,
      newPassword,
    });
    return response.data.message;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error resetting password');
    }
  }
};
export default resetPassword