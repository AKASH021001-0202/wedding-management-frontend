import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode'; // Fix import for jwt-decode
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../../redux/slices/vendorSlice';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const BecomeVendor = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isVendor, setIsVendor] = useState(false);
  const [vendorId, setVendorId] = useState(null);

  const initialValues = {
    name: '',
    service_type: '',
    phone: '',
    email: '',
    address: '',
    rating: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Vendor name is required'),
    service_type: Yup.string().required('Service type is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    rating: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .required('Rating is required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
  
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
  
      const vendorData = {
        user_id: userId,
        name: values.name,
        service_type: values.service_type,
        contact_info: {
          phone: values.phone,
          email: values.email,
          address: values.address,
        },
        rating: parseInt(values.rating),
      };
  
      if (isVendor) {
        toast.success('Vendor FOUND');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendors`, vendorData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Vendor added successfully.');
        await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/vendor`, { is_vendor: true }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Vendor information updated successfully.');
      }
  
      dispatch(fetchVendors());
      resetForm();
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg === 'Not authorized') {
        toast.error('Not authorized. Please log in again.');
      } else if (error.response) {
        console.error('Error adding/updating vendor:', error.response.data);
        toast.error('Failed to add/update vendor. Please try again.');
      } else {
        console.error('Error adding/updating vendor:', error.message);
        toast.error('Failed to add/update vendor. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="home">
      <PageHeader />
      <ToastContainer />
      <div className="container card p-5 mt-3 mb-3">
        <h1 className="mt-5" style={{ textAlign: 'center' }}>
          Become a Vendor
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="service_type">Service Type</label>
                  <Field
                    type="text"
                    id="service_type"
                    name="service_type"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="service_type"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="rating">Rating (1-5)</label>
                  <Field
                    type="number"
                    id="rating"
                    name="rating"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <PageFooter/>
    </div>
  );
};

export default BecomeVendor;
