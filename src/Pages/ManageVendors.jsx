import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchVendors, addVendor } from "../redux/slices/vendorSlice";
import { ToastContainer, toast } from 'react-toastify';
const ManageVendors = () => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors.items);
  const loading = useSelector((state) => state.vendors.loading);
  const error = useSelector((state) => state.vendors.error);
  const notify = () => toast.success("Add vendor successfull");
  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Vendor name is required'),
    service_type: Yup.string()
    .required('Service type is required')
    .oneOf(['ceremonies', 'receptions', 'other_related_functions', 'marriage'], 'Invalid service type'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    rating: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .required('Rating is required')
  });

  const initialValues = {
    name: '',
    service_type: '',
    phone: '',
    email: '',
    address: '',
    rating: ''
  };

  const onSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
  
    const userId = userInfo?.id; // Assuming userInfo contains the logged-in user's information
  
    const vendorData = {
      user_id: userId, // Ensure user_id is included
      name: values.name,
      service_type: values.service_type,
      contact_info: {
        phone: values.phone,
        email: values.email,
        address: values.address,
      },
      rating: parseInt(values.rating),
    };
  
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vendors`, vendorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchVendors());
      resetForm();
      notify();
      navigate('/dashboard');
    } catch (error) {
      // Handle errors appropriately
      if (error.response && error.response.data && error.response.data.msg === 'Not authorized') {
        // Handle authorization error
        toast.error('Not authorized. Please log in again.');
      } else if (error.response) {
        console.error('Error adding vendor:', error.response.data);
        toast.error('Failed to add vendor. Please try again.');
      } else {
        console.error('Error adding vendor:', error.message);
        toast.error('Failed to add vendor. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="container card p-5 mt-3 mb-3">
      <h1 className="mt-5">Add New Vendors</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
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
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="col-lg-6 mb-3">
    <label htmlFor="service_type">Service Type</label>
    <Field as="select" id="service_type" name="service_type" className="form-control">
      <option value="" label="Select service type" />
      <option value="ceremonies" label="Ceremonies" />
      <option value="receptions" label="Receptions" />
      <option value="other_related_functions" label="Other Related Functions" />
      <option value="marriage" label="Marriage" />
    </Field>
    <ErrorMessage name="service_type" component="div" className="text-danger" />
  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                    />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                    />
                    <ErrorMessage name="address" component="div" className="text-danger" />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="rating">Rating (1-5)</label>
                    <Field
                      type="number"
                      id="rating"
                      name="rating"
                      className="form-control"
                    />
                    <ErrorMessage name="rating" component="div" className="text-danger" />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Add Vendor
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ManageVendors;
