import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; 
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    if (token) {
      
     
      const userId = decoded.id;
     

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`, { name, email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message); // Log success message
      // Optionally, perform logout or redirect to login page after delete
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="div">
      <PageHeader />
    <div className="card mx-auto mt-4 mb-4" style={{ maxWidth: '600px' }}>
      <div className="card-body">
      <img src="https://i.ibb.co/cCqLFym/images.png" alt=""  style={{width:'200px'}}/>
        <h5 className="card-title">My Profile</h5>
        <p className="card-text">Name: {user.name}</p>
        <p className="card-text">Email: {user.email}</p>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Update name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Update email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary me-2" onClick={handleUpdateProfile}>Update Profile</button>
        <button className="btn btn-danger" onClick={handleDeleteProfile}>Delete Profile</button>
      </div>
    </div>
    <PageFooter />
    </div>
  );
};

export default Profile;
