import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ManageVendors from './Pages/ManageVendors';
import TrackBudget from './Pages/TrackBudget';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Layout from './components/Layout';
import Vendors from './Pages/Ventor';
import Dashboard from './components/Dashboard';
import EditVendorForm from './Pages/EditVendorForm';
import PlanEvent from './Pages/event/AddEvent';
import Events from './Pages/event/Events';
import BookingForm from './Pages/booking/BookingForm';
import BookingTable from './Pages/booking/BookingTable';
import Home from './Pages/landingpages/Home';
import BecomeVendor from './Pages/landingpages/BecomeVendor';
import AllEvents from './Pages/landingpages/AllEvent';
import Booking from './Pages/landingpages/Booking';
import MyBookings from './Pages/landingpages/MyBooking';
import Profile from './Pages/landingpages/Profile';
import FetchVendors from './Pages/FetchVendor';
import Review from './Pages/Review';
import WeddingBudget from './Pages/budget/WeddingBudget';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUser } from './redux/slices/userSlice';
import { refreshToken } from './apis/auth';
import MyEvents from './Pages/event/MyEvent';
import EventManagment from './components/EventManagment';
import MyBookingEvents from './Pages/booking/MyBookingEvent';
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleTokenExpiration = async () => {
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        try {
          const newToken = await refreshToken(); // Example function to refresh token
          localStorage.setItem('token', newToken);
          dispatch(setUser(decodedToken)); // Example action to update user state
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Handle token refresh error (e.g., redirect to login)
         Navigate("/login")
        }
      }
    };

    handleTokenExpiration();
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/becomevendor" element={<BecomeVendor />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/booking/:eventId" element={<Booking />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="add-event" element={<PlanEvent />} />
            <Route path="all-events" element={<Events />} />
            <Route path="myevents" element={<MyEvents />} />
          
            <Route path="vendors" element={<Vendors />} />
            <Route path="allvendors" element={<FetchVendors />} />
            <Route path="manage-vendors" element={<ManageVendors />} />
            {/* <Route path="payment/budget" element={<BudgetTracker />} /> */}
            <Route path="weddingbudget" element={<WeddingBudget/>} />
            <Route path="edit-vendor/:id" element={<EditVendorForm />} />
            <Route path="booking" element={<BookingForm />} />
            <Route path="allbooking" element={<BookingTable />} />
            <Route path="mybookingevents" element={<MyBookingEvents />} />
            <Route path="reviews" element={<Review />} />
            <Route path="track-budget" element={<TrackBudget />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
