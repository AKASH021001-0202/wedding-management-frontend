import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookingPlan,
  fetchbookingsPlan,
  updateBookingPlan,
  fetchBookingById,
  fetchBookingByIdEdit,
} from "../../redux/slices/bookingSlice";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import {jwtDecode} from "jwt-decode";
import EditBooking from "./Editbooking";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, selectedBooking } = useSelector(
    (state) => state.booking
  );
  const [editBooking, setEditBooking] = useState(null); // State to track the booking being edited
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const user_id = decoded.id;
       
        if (user_id) {
          setUser({ id: user_id });
          dispatch(fetchbookingsPlan(user_id)); // Dispatch action to fetch bookings
        } else {
          console.error("User ID is missing in the token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch]);

  // Function to fetch a booking by ID
  const fetchBookingDetails = async (user_id) => {
    try {
      await dispatch(fetchBookingById(user_id));
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleEdit = async (booking) => {
    setEditBooking(booking);
    await dispatch(fetchBookingByIdEdit(booking._id)); // Fetch details of the booking being edited
  };

  const handleUpdate = async (updatedBooking) => {
    try {
      await dispatch(
        updateBookingPlan({
          id: updatedBooking._id,
          bookingData: updatedBooking,
        })
      );
      dispatch(fetchbookingsPlan(user.id)); // Refresh bookings list
      setEditBooking(null); // Clear the edit state after successful update
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await dispatch(deleteBookingPlan(bookingId));
      dispatch(fetchbookingsPlan(user.id)); // Refresh bookings list after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const cancelEdit = () => {
    setEditBooking(null); // Cancel editing
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="div">
      <PageHeader />
      <div className="container">
        <div className="p-5 card my-bookings-container">
          <div className="my-bookings">
            <h2>My Bookings</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((booking) => booking.user_id === user?.id) // Filter bookings by logged-in user ID
                  .map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.event_id.name}</td>
                      <td>{booking.customerName}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>
                        {editBooking && editBooking._id === booking._id ? (
                          <EditBooking
                            booking={selectedBooking || booking} 
                            onUpdate={handleUpdate}
                            onCancel={cancelEdit}
                          />
                        ) : (
                          <>
                            <button
                              className="btn btn-primary me-2"
                              onClick={() => handleEdit(booking)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(booking._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default MyBookings;
