import React from "react";
import { Router, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Header */}
      <Outlet />
      {/* Footer */}
    </>
  );
};

export default Layout;
