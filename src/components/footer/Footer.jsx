import React from "react";
import Copyright from "./subcomponent/Copyright";
import Sitemap from "./subcomponent/Sitemap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Sitemap />
      <Copyright />
    </footer>
  );
};

export default Footer;
