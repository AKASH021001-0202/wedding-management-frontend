import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { createBookingPlan } from '../../redux/slices/bookingSlice';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import { ToastContainer, toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

const Booking = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const notify = () => toast.success("Booked successfully");
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.id;

  // Initial form values
  const initialValues = {
   user_id : userId,
    event_id: eventId || '',
    customerName: '',
    date: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    date: Yup.date().required('Date is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const actionResult = await dispatch(createBookingPlan(values));
      if (createBookingPlan.fulfilled.match(actionResult)) {
        resetForm();
        notify();
        setTimeout(() => {
          navigate('/mybookings');
        }, 5000);
      } else {
        setAlertMessage('Error booking event. Please try again.');
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setAlertMessage('Error booking event. Please try again.');
    }
  };

  return (
    <div className="viv">
      <PageHeader />
      <ToastContainer />
      <div className='card p-5 mt-3 mb-3'>
        <h2>Create Booking</h2>
        {alertMessage && (
          <div className={`alert ${alertMessage.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {alertMessage}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="event_id" className="form-label">Event ID</label>
                <Field type="text" className="form-control" id="event_id" name="event_id" disabled />
                <ErrorMessage name="event_id" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">Customer Name</label>
                <Field type="text" className="form-control" id="customerName" name="customerName" placeholder="Enter Customer Name" />
                <ErrorMessage name="customerName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <Field type="date" className="form-control" id="date" name="date" />
                <ErrorMessage name="date" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Booking'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <PageFooter />
    </div>
  );
};

export default Booking;
