import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../Pages/landingpages/page.css";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { clearUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const PageHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const dispatch =useDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");

    setIsAuthenticated(authStatus === "true");

    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      if (userId) {
        const fetchUserStatus = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
            );
            const user = response.data;
            setIsVendor(user.is_vendor);
          } catch (error) {
            console.error("Error fetching user status:", error);
          }
        };

        fetchUserStatus();
      }
    }
  }, []);

  const notify = () =>
    toast.warn("🦄 Logout successfully!!..", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    notify();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <ToastContainer />
      <header className="custom-header">
        <div className="custom-header-content">
          <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
              <a className="navbar-brand" href="/">
                <img
                  src="https://i.ibb.co/d0NcJKM/logo.png"
                  style={{ width: "120px" }}
                  alt="logo"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link custom-navbar-link"
                      href="/#home-section"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link custom-navbar-link"
                      href="/#about-section"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/allEvents"
                      className="nav-link custom-navbar-link"
                    >
                      Events
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/#contact-section"
                      className="nav-link custom-navbar-link"
                    >
                      Contact
                    </a>
                  </li>
                  {isAuthenticated && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle custom-navbar-link"
                        href="#"
                        id="accountDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="https://i.ibb.co/cCqLFym/images.png"
                          alt="Profile"
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="accountDropdown"
                      >
                        <li>
                          <Link to="/becomevendor" className="dropdown-item">
                            Become a Vendor
                          </Link>
                        </li>
                        {isVendor ==true && (
                          <li>
                            <Link to="/dashboard" className="dropdown-item">
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/mybookings" className="dropdown-item">
                            My Bookings
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  )}
                  {!isAuthenticated && (
                    <li className="nav-item">
                      <Link
                        to="/login"
                        className="btn btn-danger btn-sm custom-navbar-button"
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default PageHeader;
