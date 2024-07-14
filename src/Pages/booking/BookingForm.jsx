// BookingForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createBookingPlan } from '../../redux/slices/bookingSlice';

const BookingForm = () => {
  const dispatch = useDispatch();
  const { booking, loading, error } = useSelector((state) => state.booking);

  // Initial form values
  const initialValues = {
    event_id: '',
    customerName: '',
    date: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    event_id: Yup.string().required('Event ID is required'),
    customerName: Yup.string().required('Customer Name is required'),
    date: Yup.date().required('Date is required'),
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    dispatch(createBookingPlan(values));
    resetForm(); // Reset form fields after submission
  };

  return (
    <div className='card p-5 mt-3 mb-3'>
      <h2>Create Booking</h2>
      {error && <p>{error}</p>}
      {booking && (
        <div>
          <p>Booking ID: {booking._id}</p>
          <p>Customer Name: {booking.customerName}</p>
          <p>Date: {booking.date}</p>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="event_id" className="form-label">
                Event ID
              </label>
              <Field
                type="text"
                className="form-control"
                id="event_id"
                name="event_id"
                placeholder="Enter Event ID"
              />
              <ErrorMessage
                name="event_id"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Customer Name
              </label>
              <Field
                type="text"
                className="form-control"
                id="customerName"
                name="customerName"
                placeholder="Enter Customer Name"
              />
              <ErrorMessage
                name="customerName"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <Field
                type="date"
                className="form-control"
                id="date"
                name="date"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Booking'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
