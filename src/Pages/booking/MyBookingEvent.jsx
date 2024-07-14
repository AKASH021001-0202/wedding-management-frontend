import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode"; // Corrected import
import { deleteBookingPlan } from "../../redux/slices/bookingSlice";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookingEvents = () => {
  const dispatch = useDispatch();
  const [bookedCustomers, setBookedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bookings/event/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setBookedCustomers(response.data);
        } else {
          setBookedCustomers([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked customers:", error);
        setError("Error fetching booked customers");
        setLoading(false);
      }
    };

    fetchBookedCustomers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      // Dispatch deleteBookingPlan action with booking ID
      await dispatch(deleteBookingPlan(id));
      toast.success("Delete successful"); // Corrected toast message
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Error deleting booking");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Booked Events</h2>
      <div className="row">
        {bookedCustomers.map((booking) => (
          <div key={booking._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Customer Name: {booking.customerName}</h5>
                <p className="card-text">Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(booking._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingEvents;
