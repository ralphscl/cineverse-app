import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CineverseLogo from "../../assets/png/cineverse-hd-logo-transparent.png";
import "./Navbar.css";

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
    <nav className={`nav ${navbarClass && "bg_black"}`}>
      <Link to={"/"}>
        <img className="logo" src={CineverseLogo} alt="cineverse_logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
