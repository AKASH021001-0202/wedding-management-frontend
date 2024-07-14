import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addEvent, fetchEvents } from "../../apis/eventThunks";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const PlanEvent = () => {
  const dispatch = useDispatch();
  const notify = () => toast.success("Event added successfully");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const initialValues = {
    user_id: userId,
    name: "",
    category: "",
    location: "",
    description: "",
    budget: "",
    status: "planned",
    imageUrl: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Event name is required"),
    category: Yup.string()
      .oneOf(
        ["ceremonies", "receptions", "other_related_functions", "marriage"],
        "Invalid category"
      )
      .required("Event category is required"),
    location: Yup.string().required("Event location is required"),
    description: Yup.string().required("Event description is required"),
    budget: Yup.number()
      .required("Event budget is required")
      .positive("Budget must be positive"),
    status: Yup.string().oneOf(["planned", "completed"], "Invalid status"),
    imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(addEvent(values));
      resetForm();
      notify();
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle error notification or logging
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container card mt-3 mb-5">
      <h1>Create Event</h1>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="row">
            <div className="form-group col-lg-12">
              <label htmlFor="name">Event Name</label>
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
          </div>

          <div className="row">
            <div className="form-group col-lg-6">
              <label htmlFor="category">Event Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className="form-control"
              >
                <option value="" label="Select category" />
                <option value="ceremonies" label="Ceremonies" />
                <option value="receptions" label="Receptions" />
                <option value="other_related_functions" label="Other Related Functions" />
                <option value="marriage" label="Marriage" />
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="location">Event Location</label>
              <Field
                type="text"
                id="location"
                name="location"
                className="form-control"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-danger"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-lg-12">
              <label htmlFor="description">Event Description</label>
              <Field
                type="text"
                id="description"
                name="description"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-lg-6">
              <label htmlFor="budget">Event Budget</label>
              <Field
                type="number"
                id="budget"
                name="budget"
                className="form-control"
              />
              <ErrorMessage
                name="budget"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="status">Event Status</label>
              <Field
                as="select"
                id="status"
                name="status"
                className="form-control"
              >
                <option value="planned">Planned</option>
                <option value="completed">Completed</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-danger"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-lg-12">
              <label htmlFor="imageUrl">Image URL</label>
              <Field
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="form-control"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-danger"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PlanEvent;
