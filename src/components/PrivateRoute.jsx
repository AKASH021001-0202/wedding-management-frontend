import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const token = useSelector((state) => state.user.token);
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

  if (isAuthenticated || token) {
    return <Outlet />;
  }

  return <Navigate to="/home" />;
};

export default PrivateRoute;
