import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const cookies = Cookies.get("access_token");
  const { authenticate } = useSelector((state) => state.login);
  console.log("login", authenticate);
  if (authenticate) {
    return <Outlet />;
  }
  if (!authenticate) {
    return (
      <div className="flex flex-col items-center justify-center h-screen border-2 border-gray-300 shadow-2xl">
        <h1>Session Expired</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 256 256"
          className="mt-4 text-red"
        >
          <path
            fill="currentColor"
            d="M122 136V80a6 6 0 0 1 12 0v56a6 6 0 0 1-12 0m108-44.45v72.9a13.92 13.92 0 0 1-4.1 9.9l-51.55 51.55a13.92 13.92 0 0 1-9.9 4.1h-72.9a13.92 13.92 0 0 1-9.9-4.1L30.1 174.35a13.92 13.92 0 0 1-4.1-9.9v-72.9a13.92 13.92 0 0 1 4.1-9.9L81.65 30.1a13.92 13.92 0 0 1 9.9-4.1h72.9a13.92 13.92 0 0 1 9.9 4.1l51.55 51.55a13.92 13.92 0 0 1 4.1 9.9m-12 0a2 2 0 0 0-.59-1.42l-51.54-51.54a2 2 0 0 0-1.42-.59h-72.9a2 2 0 0 0-1.41.59L38.58 90.13a2 2 0 0 0-.58 1.42v72.9a2 2 0 0 0 .59 1.42l51.54 51.54a2 2 0 0 0 1.42.59h72.9a2 2 0 0 0 1.41-.59l51.56-51.54a2 2 0 0 0 .58-1.42ZM128 162a10 10 0 1 0 10 10a10 10 0 0 0-10-10"
          />
        </svg>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  
};
export default PrivateRoutes;
