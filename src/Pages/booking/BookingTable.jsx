import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchbookingsPlan, updateBookingPlan, deleteBookingPlan } from '../../redux/slices/bookingSlice';

const BookingTable = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const [editBooking, setEditBooking] = useState(null); // State to track the booking being edited

  useEffect(() => {
    dispatch(fetchbookingsPlan()); // Fetch bookings when component mounts
  }, [dispatch]);

  const handleUpdate = (updatedBooking) => {
    dispatch(updateBookingPlan({ id: updatedBooking._id, bookingData: updatedBooking }));
    setEditBooking(null); // Clear the edit state after successful update
  };

  const handleDelete = (id) => {
    dispatch(deleteBookingPlan(id));
  };

  const cancelEdit = () => {
    setEditBooking(null); // Cancel editing
  };

  const handleEdit = (booking) => {
    setEditBooking(booking); // Set the booking to edit
  };

  return (
    <div className='card p-5 mt-3 mb-3'>
      <h2>Bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.event_id}</td>
                <td>{booking.customerName}</td>
                <td>{booking.date}</td>
                <td>
                  {editBooking === booking ? (
                    <EditForm booking={booking} onUpdate={handleUpdate} onCancel={cancelEdit} />
                  ) : (
                    <>
                      <button className="btn btn-primary btn-sm me-1" onClick={() => handleEdit(booking)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(booking._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const EditForm = ({ booking, onUpdate, onCancel }) => {
  const [updatedBooking, setUpdatedBooking] = useState({ ...booking });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedBooking);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="event_id" className="form-label">
          Event ID
        </label>
        <input
          type="text"
          className="form-control"
          id="event_id"
          name="event_id"
          value={updatedBooking.event_id}
          onChange={handleChange}
          disabled // Assuming event_id is not editable
        />
      </div>
      <div className="mb-3">
        <label htmlFor="customerName" className="form-label">
          Customer Name
        </label>
        <input
          type="text"
          className="form-control"
          id="customerName"
          name="customerName"
          value={updatedBooking.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={updatedBooking.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        Update
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default BookingTable;
