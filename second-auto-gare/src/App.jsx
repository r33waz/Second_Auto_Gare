import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./components/common/header";
import Home from "./pages/User/home";
import Footer from "./components/common/footer";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/Admin/Dashboard";
import { Provider } from "react-redux";
import { persist, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import User from "./pages/Admin/user";
import SideNav from "./components/common/SlideNav";
import UpdateUser from "./pages/Admin/updateUser";
import Vehicle from "./pages/Admin/vehicle";
import Contact from "./pages/User/contact";
function App() {
  const paths = [
    "/login",
    "/signup",
    "/admin",
    "/admin/vehicle",
    "/admin/user",
    "/admin/bookings",
    "/admin/updateProfile/:id",
  ];
  const location = useLocation();
  const pathname = paths.includes(location.pathname);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          {!pathname && <Header />}
          <Routes>
            <Route
              path="/admin/*"
              element={
                <div className="flex">
                  <SideNav />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/updateProfile/:id" element={<UpdateUser />} />
                    <Route path="/vehicle" element={<Vehicle />}></Route>
                  </Routes>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
          {!pathname && <Footer />}
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
