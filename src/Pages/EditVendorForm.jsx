import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendor, fetchVendorById } from '../redux/slices/vendorSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

const EditVendorForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const vendor = useSelector(state => state.vendors.items.find(vendor => vendor._id === id));
    
    useEffect(() => {
        if (!vendor) {
            dispatch(fetchVendorById(id));
        }
    }, [dispatch, id, vendor]);

    // Validation schema with Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        service_type: Yup.string().required('Service type is required'),
        contact_info: Yup.object().shape({
            phone: Yup.string().required('Phone number is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            address: Yup.string().required('Address is required'),
        }),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(updateVendor({ ...values, _id: id }))
            .then(() => {
                toast.success("Vendor deleted successfully!");
                // Optionally redirect or handle success
            })
            .catch(error => {
                console.error('Error updating vendor:', error);
                toast.error("Error deleting vendor!");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (!vendor) return <div>Loading...</div>;

    return (
        <div className="container card p-5 mt-3 mb-3">
              <ToastContainer/>
            <h2>Edit Vendor</h2>
            <Formik
                initialValues={{
                    name: vendor.name || '',
                    service_type: vendor.service_type || '',
                    contact_info: {
                        phone: vendor.contact_info.phone || '',
                        email: vendor.contact_info.email || '',
                        address: vendor.contact_info.address || '',
                    },
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service_type">Service Type:</label>
                            <Field
                                type="text"
                                id="service_type"
                                name="service_type"
                                value={values.service_type}
                                onChange={handleChange}
                                className={`form-control ${touched.service_type && errors.service_type ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="service_type" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <Field
                                type="text"
                                id="phone"
                                name="contact_info.phone"
                                value={values.contact_info.phone}
                                onChange={handleChange}
                                className={`form-control ${touched['contact_info.phone'] && errors.contact_info?.phone ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="contact_info.phone" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="contact_info.email"
                                value={values.contact_info.email}
                                onChange={handleChange}
                                className={`form-control ${touched['contact_info.email'] && errors.contact_info?.email ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="contact_info.email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <Field
                                type="text"
                                id="address"
                                name="contact_info.address"
                                value={values.contact_info.address}
                                onChange={handleChange}
                                className={`form-control ${touched['contact_info.address'] && errors.contact_info?.address ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="contact_info.address" component="div" className="invalid-feedback" />
                        </div>
                        <div>
                            <button className="btn btn-primary mt-3" type="submit">Update Vendor</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditVendorForm;
