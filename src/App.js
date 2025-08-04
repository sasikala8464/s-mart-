import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar1 from "./components/Navbar1";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Whishlist from "./components/Whishlist";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Im from "./components/Im";
import Footer from "./components/Footer";
import Carosel from "./components/Carosel";
import { getproductRedux } from "./features/redux/slices.js/productSlice";
import CheckoutPage from "./features/chekout/CheckoutPage";
import "leaflet/dist/leaflet.css";
import AddressForm from "./features/chekout/AddressFrom";
import Payment from "./components/Payment";
import Confirm from "./components/Confirmation";

// Wrapper
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLogin = location.pathname === "/login";
  const isConfirm = location.pathname === "/confirm";

  useEffect(() => {
    (async function () {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      dispatch(getproductRedux(data));
    })();
  }, [dispatch]);

  return (
    <div>
      {/* ✅ Navbar hidden only on confirm */}
      {!isConfirm && <Navbar1 />}

      {/* ✅ Carosel hidden on login and confirm */}
      {!isLogin && !isConfirm && <Carosel />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Activityfeed" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/whishlist" element={<Whishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/im" element={<Im />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>

      {/* ✅ Footer hidden on login and confirm */}
      {!isLogin && !isConfirm && <Footer />}
    </div>
  );
};

export default AppWrapper;
