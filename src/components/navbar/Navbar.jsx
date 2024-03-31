import React, { useEffect, useState } from "react";
import CineverseLogo from "../../assets/cineverse-hd-logo-transparent.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarClass(true);
      } else {
        setNavbarClass(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={`nav ${navbarClass && "bg_black"}`}>
      <Link to={"/"}>
        <img className="logo" src={CineverseLogo} alt="cineverse_logo" />
      </Link>
    </div>
  );
};

export default Navbar;
