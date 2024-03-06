import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.login);
  console.log("login", isLoggedIn);
  return isLoggedIn.login.islogin ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
