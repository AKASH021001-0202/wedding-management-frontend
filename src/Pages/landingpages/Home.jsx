import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const Home = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <div className="home">
      <PageHeader />

      <section id="home-section" style={{ backgroundColor: "#000070" }}>

         <div id="weddingCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#weddingCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#weddingCarousel" data-slide-to="1"></li>
        <li data-target="#weddingCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://i.ibb.co/yFzpVBZ/decorated-wedding-hall-with-candles-round-tables-centerpieces.jpg
" className="d-block w-100" alt="First slide"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Wedding Venue</h5>
            <p>Find the perfect venue for your wedding day.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://i.ibb.co/zSrQh8V/luxury-wedding-tent-with-decor-banquet.jpg" className="d-block w-100" alt="Second slide"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Catering Services</h5>
            <p>Delicious menus to delight your guests.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="https://i.ibb.co/yV6J0fn/warm-welcoming-atmosphere-as-guests-arrive-party-venue.jpg" className="d-block w-100" alt="Third slide"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Photography</h5>
            <p>Capture the special moments with professional photography.</p>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#weddingCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#weddingCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
      </section>
      <div className="main-content container mt-5">
        <div className="row">
          {/* Teacher Section */}
          <div className="col-md-6">
            <div>
              <img
                src="https://i.ibb.co/hLDtV0J/2151110993.jpg"
                alt="Teacher"
                style={{
                  maxWidth: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          {/* Student Section */}
          <div className="col-md-6" id="about-section">
            <div
              className="content-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <h3>About Us</h3>
              <p>
                Welcome to Weeding Management. At Weeding Management, we believe
                that every wedding should be a unique reflection of the couple's
                love story. Our mission is to turn your dream wedding into a
                reality with meticulous planning, creative design, and flawless
                execution. Who We Are: We are a team of passionate and
                experienced wedding planners dedicated to creating unforgettable
                weddings. From intimate ceremonies to grand celebrations, we
                bring a wealth of knowledge and a personal touch to every event
                we manage.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        id="events-section"
        style={{ backgroundColor: "#ddd" }}
        className="pt-5"
      >
        <div className="container">
          <div className="row homecard">
            <h1>Events</h1>
            <div className="col-lg-4 card">
              <img
                src="https://i.pinimg.com/736x/e2/43/48/e2434800a82afc2d56e1f10a5b178eef.jpg"
                alt="Wedding"
                style={{ width: "100%" }}
              />
              <h1>Wedding</h1>
            </div>
            <div className="col-lg-4 card">
              <img
                src="https://i.pinimg.com/736x/3b/16/77/3b1677733d37180cd6cdfa3a49995a3b.jpg"
                alt="Reception"
                style={{ width: "100%" }}
              />
              <h1>Reception</h1>
            </div>
            <div className="col-lg-4 card">
              <img
                src="https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2018/09/PRJA9793.jpg"
                alt="Engagement"
                style={{ width: "100%" }}
              />
              <h1>Engagement</h1>
            </div>
          </div>
          <p align="center"><Link to={"/allEvents"} className="btn btn-primary mt-3 mx-auto my-auto  " >View All Event </Link> </p>
        </div>
      </section>
      <section
        id="contact-section"
        style={{ backgroundColor: "#f9f9f9", padding: "2rem 0" }}
      >
        <div className="container">
          <h2>Contact Us</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-danger">{formik.errors.message}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </section>
      <PageFooter />
    </div>
  );
};

export default Home;
