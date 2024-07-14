import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import resetPassword from "../apis/resetpassword.js"; // Adjust import path as needed

function ResetPassword() {
  const [message, setMessage] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      const responseMessage = await resetPassword(token, values.newPassword);
      setMessage(responseMessage);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (message === "Password reset successful") {
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, [message]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card">
          <div className="col-lg-6">
            <img
              className="resetpassword"
              src="https://i.ibb.co/cNFC8sH/6321602.jpg"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Reset Password</h1>
              <Formik
                initialValues={{ newPassword: "", confirmPassword: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.newPassword) {
                    errors.newPassword = "Required";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Required";
                  } else if (values.newPassword !== values.confirmPassword) {
                    errors.confirmPassword = "Passwords don't match";
                  }
                  return errors;
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password:
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        required
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password:
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Reset Password"}
                    </button>
                  </Form>
                )}
              </Formik>
              {message && (
                <p className="mt-3 text-center text-success">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
