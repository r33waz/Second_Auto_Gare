import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const isLoggedIn = useSelector((state) => state.login);
  return isLoggedIn.role === "admin" ? <Outlet /> : <Navigate to="/home" />;
};
export default AdminRoute;
