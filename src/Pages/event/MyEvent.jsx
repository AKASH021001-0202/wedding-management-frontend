// frontend/components/MyEvents.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, updateEvent, deleteEvent } from "../../apis/eventThunks";
import {jwtDecode} from "jwt-decode";

const MyEvents = ({ eventId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  const [editMode, setEditMode] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const decode = jwtDecode(token);
      const userId = decode.id;

      if (userId) {
        dispatch(fetchEventById({ eventId, userId }));
      } else {
        console.error("User ID not found in JWT token");
      }
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }, [dispatch, eventId]);

  const handleEdit = (event) => {
    setEditMode(true);
    setUpdatedEvent(event);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUpdatedEvent({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateEvent(updatedEvent));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await dispatch(deleteEvent(eventId));
      setEditMode(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!events || events.length === 0) {
    return <p>No events found for the authenticated user.</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Events</h1>
      <div className="row">
        {events.map((event) => (
          <div className="col-lg-12 mb-4" key={event._id}>
            <div className="card h-100">
              <div className="row g-0">
                <div className="col-lg-4">
                  <img
                    src={event.imageUrl || "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid"
                    alt={event.name}
                    style={{ objectFit: "cover", height: "100%" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="col-lg-8">
                  <div className="card-body">
                    {!editMode ? (
                      <>
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">{event.description}</p>
                        <p className="card-text">Location: {event.location}</p>
                        <p className="card-text">Budget: ${event.budget}</p>
                        <div>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEdit(event)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate();
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Event Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={updatedEvent.name || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">
                            Event Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={updatedEvent.location || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Event Description
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={updatedEvent.description || ""}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="budget" className="form-label">
                            Event Budget
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="budget"
                            name="budget"
                            value={updatedEvent.budget || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">
                            Event Status
                          </label>
                          <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={updatedEvent.status || ""}
                            onChange={handleChange}
                            required
                          >
                            <option value="planned">Planned</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </form>
                    )}
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

export default MyEvents;
