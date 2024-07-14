import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaCalendarCheck, FaStore } from 'react-icons/fa';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct the import

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [vendorEventCount, setVendorEventCount] = useState(1); // Changed variable name for clarity
  const [myEventCount, setMyEventCount] = useState(0); // State for my event count

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Decode the token to get the vendor ID
      const decoded = jwtDecode(token);
      const vendorId = decoded.id;
      const vendor_id = vendorId;
      const userId = vendorId;

      // Fetch bookings count
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookings/${vendor_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setBookingCount(response.data.length);
        })
        .catch(error => {
          console.error('There was an error fetching the booking count!', error);
        });

      // Fetch user count without relying on the token
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/count`)
        .then(response => {
          setUserCount(response.data.count);
        })
        .catch(error => {
          console.error('There was an error fetching the user count!', error);
        });

      // Fetch vendor-specific event count
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/vendor/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setVendorEventCount(response.data.count);
        })
        .catch(error => {
          console.error('There was an error fetching the vendor-specific event count!', error);
        });

      // Fetch events count for the logged-in user
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setMyEventCount(response.data.length); // Assuming response.data is an array of events
        })
        .catch(error => {
          console.error('There was an error fetching the event count for the logged-in user!', error);
        });
    }
  }, [token]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaUser className="card-icon mb-3" />
              <h5 className="card-title">Users</h5>
              <p className="card-text">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaCalendarCheck className="card-icon mb-3" />
              <h5 className="card-title">Bookings</h5>
              <p className="card-text">{bookingCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaStore className="card-icon mb-3" />
              <h5 className="card-title">My Events</h5>
              <p className="card-text">{myEventCount}</p> {/* Display my event count */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <FaStore className="card-icon mb-3" />
              <h5 className="card-title">Vendor Events</h5>
              <p className="card-text">{vendorEventCount}</p> {/* Display vendor-specific event count */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
