import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteEvent, fetchEvents, updateEvent } from '../../apis/eventThunks';

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  
  const [editEvent, setEditEvent] = useState(null); // State to track the event being edited


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [dispatch, status]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvent(id));
      // Optionally, you can refresh events after deletion if needed:
      // dispatch(fetchEvents());
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event); // Set the event to edit
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      await dispatch(updateEvent(updatedEvent));
      setEditEvent(null); // Clear the edit state after successful update
      // Optionally, you can refresh events after update if needed:
      // dispatch(fetchEvents());
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const cancelEdit = () => {
    setEditEvent(null); // Cancel editing
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ALL EVENTS</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Error fetching events: {error}</p>}
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-lg-12 mb-4">
            <div className="card h-100">
              <div className="row g-0">
                <div className="col-lg-4">
                  <img
                    src={event.imageUrl || 'https://via.placeholder.com/150'}
                    className="card-img-top img-fluid"
                    alt={event.name}
                    style={{ objectFit: 'cover', height: '100%' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="card-body">
                    {editEvent === event ? (
                      <EditForm event={event} onUpdate={handleUpdate} onCancel={cancelEdit} />
                    ) : (
                      <>
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">{event.description}</p>
                      
                        <p className="card-text">Location: {event.location}</p>
                        <p className="card-text">Budget: ${event.budget}</p>
                        <p className="card-text">Status: {event.status}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-2 d-flex align-items-center justify-content-center">
                  <div className="card-body d-flex flex-column justify-content-between">
                    {editEvent !== event ? (
                      <>
                       {/*  <button className="btn btn-primary mb-2" onClick={() => handleEdit(event)}>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(event._id)}
                        >
                          Delete
                        </button> */}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditForm = ({ event, onUpdate, onCancel }) => {
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Event Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={updatedEvent.name}
          onChange={handleChange}
          required
        />
      </div>
     
      <div className="mb-3">
        <label htmlFor="location" className="form-label">Event Location</label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          value={updatedEvent.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Event Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={updatedEvent.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="budget" className="form-label">Event Budget</label>
        <input
          type="number"
          className="form-control"
          id="budget"
          name="budget"
          value={updatedEvent.budget}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Event Status</label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={updatedEvent.status}
          onChange={handleChange}
          required
        >
          <option value="planned">Planned</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary me-2">Update</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default Events;
