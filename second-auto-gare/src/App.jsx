import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/header";
import Home from "./pages/User/home";
import Footer from "./components/common/footer";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
