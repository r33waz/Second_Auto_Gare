import React from "react";
import { Outlet, Navigate, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { authenticate } = useSelector((state) => state.login);
  console.log("login", authenticate);
  if (authenticate) {
    return <Outlet />;
  }
  if (!authenticate) {
    return (
      <>
        <Navigate to="/login"></Navigate>
      </>
    );
  }
};
export default PrivateRoutes;
