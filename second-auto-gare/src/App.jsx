import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/header";
import Home from "./pages/User/home";
import Footer from "./components/common/footer";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import { Provider } from "react-redux";
import { store } from "../store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
