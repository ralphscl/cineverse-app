import React from "react";
import { Router, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* Footer */}
    </>
  );
};

export default Layout;
