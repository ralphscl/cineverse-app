import React from "react";
import { Link } from "react-router-dom";
import CineverseLogo from "../../../assets/png/cineverse-hd-logo-transparent.png";
import "./Sitemap.css";

const Sitemap = () => {
  return (
    <section
      className="sitemap"
      style={
        {
          // background: `url(${StripedBackground})`,
          // backgroundSize: "cover",
          // backgroundPosition: "bottom",
          // height: "10rem",
        }
      }
    >
      <div className="wrapper">
        <div>
          <Link to={"/"}>
            <img className="logo" src={CineverseLogo} alt="cineverse_logo" />
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consect etur adi pisicing elit sed do
            eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit sed do
            elit.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link>Movies</Link>
            </li>
            <li>
              <Link to={"/series"}>Series</Link>
            </li>
            <li>
              <Link>Blogs</Link>
            </li>
            <li>
              <Link>About Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Account</h3>
          <ul>
            <li>
              <Link>Choose a Plan</Link>
            </li>
            <li>
              <Link>Landing Page</Link>
            </li>
            <li>
              <Link>My Account</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>66 Brooklyn Street, NY United States</li>
            <li>1-800-123-4567</li>
            <li>support@cineverse.com</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
