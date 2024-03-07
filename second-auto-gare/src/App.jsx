import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/common/header";
import Home from "./pages/page/home";
import Footer from "./components/common/footer";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/Admin/Dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import User from "./pages/Admin/user";
import UpdateUser from "./pages/Admin/updateUser";
import Vehicle from "./pages/Admin/vehicle";
import Contact from "./pages/page/contact";
import Noroute from "./pages/auth/noroute";
import About from "./pages/page/about";
import Vehicles from "./pages/User/vehicles";
import tyre from "./assets/images/tyre.png";
import Category from "./pages/page/categoty";
import SingleVehicle from "./pages/page/singleVehicle";
import PrivateRoutes from "./pages/auth/protectedroute";
import AdminRoute from "./pages/auth/adminroute";
import Userprofile from "./pages/User/userprofile";
import { persist, store } from "./redux/store/store";
import UserPost from "./pages/User/usepost";
function App() {
  const paths = [
    "/login",
    "/signup",
    "/admin/dashboard",
    "/admin/vehicle",
    "/admin/user",
    "/admin/bookings",
    "/admin/updateProfile/:id",
    "*",
  ];
  const location = useLocation();
  const pathname = paths.includes(location.pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Provider store={store}>
          <PersistGate persistor={persist}>
            {!pathname && <Header />}
            <Routes>
              {/* <Route element={<AdminRoute />}> */}
              <Route
                path="/admin/*"
                element={
                  <div className="flex">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/user" element={<User />} />
                      <Route
                        path="/updateProfile/:id"
                        element={<UpdateUser />}
                      />
                      <Route path="/vehicle" element={<Vehicle />}></Route>
                    </Routes>
                  </div>
                }
              />
              {/* </Route> */}

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route element={<PrivateRoutes />}> */}
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/category" element={<Vehicles />} />
              <Route path="/car/:vehicle" element={<Category />} />
              <Route path="/vehicle/:vehicle" element={<SingleVehicle />} />
              <Route path="/profile" element={<Userprofile />} />
              <Route path="/userpost" element={<UserPost />} />
              {/* </Route> */}
              <Route path="*" element={<Noroute />} />
            </Routes>
            {!pathname && <Footer />}
          </PersistGate>
        </Provider>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img src={tyre} className="w-40 h-40 animate-spin" />
        </div>
      )}
    </>
  );
}

export default App;
