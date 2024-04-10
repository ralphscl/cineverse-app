import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/backToTop/BackToTop";
import Newsletter from "./components/newsletter/Newsletter";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <BackToTop />

      <Navbar />
      <Outlet />

      {location.pathname === "/series" && <Newsletter />}

      <Footer />
    </>
  );
};

export default Layout;
