import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import forgetPassword from '../apis/forgetpassword.js';

const ForgotPassword = () => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const forgetResponse = await forgetPassword(values.email);
      console.log('Forget Password response:', forgetResponse);
      // Handle successful response (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error sending reset email:', error.message);
      // Handle error (e.g., display an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <div className="row">
          <div className="col-lg-4" style={{ height: '370px', borderRight: '1px solid gold' }}>
            <img src="https://i.ibb.co/7nqV2jb/4841115.jpg" className="resetpassword" alt="" />
          </div>
          <div className="col-lg-8">
            <div className="form-align">
              <h1 className="my-4">Forgot Password</h1>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field type="email" name="email" className="form-control" id="email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Reset Email...' : 'Send Reset Email'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
