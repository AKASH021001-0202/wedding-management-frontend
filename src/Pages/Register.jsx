import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterdata } from "../apis/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast.success("register successfull");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await userRegisterdata(values);
      dispatch(setUser(response.data));
      resetForm();
      notify();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally, you can show an error toast message here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-register text-dark register-height">
      
      <div className="container">
        <div className="card-box">
          <div className="row">
            <div
              className="col-lg-4"
              style={{
                backgroundImage: 'URL("https://i.ibb.co/tLKzDL1/up1.jpg")',
                backgroundSize: "contain",
              }}
            >
              <p style={{ height: "500px" }}></p>
            </div>
            <div className="col-lg-8">
              <div className="form-align">
                <h3 className="display-5">Welcome to WeddingWise!</h3>
                <hr className="my-4" />
                <p>
                  Get started by creating an account or{" "}
                  <Link to="/login">login here</Link> if you already have one.
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label>Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={isSubmitting}
                      >
                        Register
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Register;
