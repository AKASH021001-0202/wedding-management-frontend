import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Select from 'react-select';
import { fetchEvents } from '../../apis/eventThunks';

const serviceTypeOptions = [
  { value: 'ceremonies', label: 'Ceremonies' },
  { value: 'receptions', label: 'Receptions' },
  { value: 'other_related_functions', label: 'Other Related Functions' },
  { value: 'marriage', label: 'Marriage' },
];

const AllEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  const [filters, setFilters] = useState({
    service_type: '',
    location: '',
    budget_range: [0, 10000000]
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleServiceTypeChange = (selectedOption) => {
    setFilters((prevFilters) => ({ ...prevFilters, service_type: selectedOption.value }));
  };

  const handleBudgetChange = (e) => {
    const { value, name } = e.target;
    setFilters((prevFilters) => {
      const newBudget = [...prevFilters.budget_range];
      if (name === 'min_budget') newBudget[0] = Number(value);
      if (name === 'max_budget') newBudget[1] = Number(value);
      return { ...prevFilters, budget_range: newBudget };
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/filtered`, {
        params: filters
      });
      dispatch({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Filtered events based on current filters
  const filteredEvents = events.filter((event) => {
    const { service_type, location, budget_range } = filters;

    // Check if filters are empty or match event properties
    const matchesServiceType = !service_type || event.category === service_type;
    const matchesLocation = !location || event.location.toLowerCase().includes(location.toLowerCase());
    const matchesBudget = event.budget >= budget_range[0] && event.budget <= budget_range[1];

    // Return true if all filters are empty or match
    return matchesServiceType && matchesLocation && matchesBudget;
  });

  const handleBooking = (eventId) => {
    navigate(`/booking/${eventId}`);
  };

  return (
    <div>
      <PageHeader />
      <div className="container">
        <div className="filter-form">
          <h1 className="text-center mb-4">Search and Filter Events</h1>
          <div className="row mb-4">
            <div className="col-md-3">
              <Select
                options={serviceTypeOptions}
                onChange={handleServiceTypeChange}
                placeholder="Select Service Type"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="form-control"
                placeholder="Location"
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="min_budget"
                value={filters.budget_range[0]}
                onChange={handleBudgetChange}
                className="form-control"
                placeholder="Min Budget"
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="max_budget"
                value={filters.budget_range[1]}
                onChange={handleBudgetChange}
                className="form-control"
                placeholder="Max Budget"
              />
            </div>
            <div className="col-md-12 mt-3 text-center">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-center mb-4">Upcoming Events</h1>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p style={{ color: 'red' }}>Error fetching events: {error}</p>}
          <div className="row">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event._id} className="col-lg-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={event.imageUrl || 'https://via.placeholder.com/150'}
                      className="card-img-top img-fluid"
                      alt={event.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="card-body">
                      <p className="card-text">{event.description}</p>
                      <small className="text-muted">{event.category}</small>
                      <small className="text-muted">{event.date}</small>
                      <p className="card-text">Location: {event.location}</p>
                      <p className="card-text">Budget: ${event.budget}</p>
                      <p className="card-text">Status: {event.status}</p>
                      <button className="btn btn-primary" onClick={() => handleBooking(event._id)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-12 text-center">
                <p>No events found based on current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

export default AllEvents;
