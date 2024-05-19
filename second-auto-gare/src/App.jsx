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
import Vehicles from "./pages/page/vehicles";
import Category from "./pages/page/category";
import SingleVehicle from "./pages/page/singleVehicle";
import PrivateRoutes from "./pages/auth/protectedroute";
import AdminRoute from "./pages/auth/adminroute";
import Userprofile from "./pages/User/userprofile/userprofile";
import { persist, store } from "./redux/store/store";
import UserPost from "./pages/User/userpost/usepost";
import UserPostUpdate from "./pages/User/userpost/userPostUpdate";
import Loading from "./components/common/loading";
import Booking from "./pages/page/booking";
import CreatePost from "./pages/User/userpost/createPost";
import UserBooking from "./pages/User/userpost/usersBooking";
import VehicleBooking from "./pages/page/vehicleBooking";
import Inbox from "./pages/page/inbox";
import ForgetPassword from "./pages/auth/forgetPassword";
import ResetPassword from "./pages/auth/resetPassword";
import AllBooking from "./pages/Admin/allBooking";
import BookingDetails from "./pages/Admin/bookingDetails";
import VehicleDetail from "./pages/Admin/vehicleDetail";
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <Provider store={store}>
          <PersistGate persistor={persist}>
            <Routes>
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
                        <Route path="/vehicle" element={<Vehicle />} />
                        <Route path="/allbooking" element={<AllBooking />} />
                        <Route
                          path="/booking_detail/:id"
                          element={<BookingDetails />}
                        />
                        <Route
                          path="/vehicle_detail/:id"
                          element={<VehicleDetail />}
                        />
                    </Routes>
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Header />
                    <Login />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Header />
                    <Signup />
                    <Footer />
                  </>
                }
              />
              <Route element={<PrivateRoutes />}>
                <Route
                  path="/createpost"
                  element={
                    <>
                      <Header />
                      <CreatePost />
                      <Footer />
                    </>
                  }
                />

                <Route path="/inbox" element={<Inbox />} />
                <Route
                  path="/ressetPassword/:id/:token"
                  element={<ResetPassword />}
                />
              </Route>
              <Route
                path="/vehicle-booking/:id"
                element={
                  <>
                    <Header />
                    <VehicleBooking />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/user-booking"
                element={
                  <>
                    <Header />
                    <UserBooking />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/forgetpassword"
                element={
                  <>
                    <Header />
                    <ForgetPassword />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/booking"
                element={
                  <>
                    <Header />
                    <Booking />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Header />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Header />
                    <About />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/category"
                element={
                  <>
                    <Header />
                    <Category />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/car/:type"
                element={
                  <>
                    <Header />
                    <Vehicles />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/vehicle/:id"
                element={
                  <>
                    <Header />
                    <SingleVehicle />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Header />
                    <Userprofile />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/userpost"
                element={
                  <>
                    <Header />
                    <UserPost />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/updatepost/:id"
                element={
                  <>
                    <Header />
                    <UserPostUpdate />
                    <Footer />
                  </>
                }
              />
              <Route path="*" element={<Noroute />} />
            </Routes>
          </PersistGate>
        </Provider>
      )}
    </>
  );
}

export default App;
