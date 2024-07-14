import React, { useState, useEffect } from 'react';

const EditBooking = ({ booking, onUpdate, onCancel }) => {
  const [updatedBooking, setUpdatedBooking] = useState({});

  useEffect(() => {
    setUpdatedBooking({ ...booking });
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setUpdatedBooking((prevBooking) => {
      const updated = JSON.parse(JSON.stringify(prevBooking));
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedBooking);
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <div className="mb-3">
        <label htmlFor="eventName" className="form-label">Event Name</label>
        <input
          type="text"
          className="form-control"
          id="eventName"
          name="event_id.name"
          value={updatedBooking.event_id?.name || ''}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="customerName" className="form-label">Customer Name</label>
        <input
          type="text"
          className="form-control"
          id="customerName"
          name="customerName"
          value={updatedBooking.customerName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={updatedBooking.date?.substring(0, 10) || ''}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">Update</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditBooking;
