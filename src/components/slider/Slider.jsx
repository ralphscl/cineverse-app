import React, { useState, useRef } from "react";
import ShowDetails from "../showDetails/ShowDetails";
import "./Slider.css";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const Slider = ({ slideData, delay = 5000 }) => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the current slide being dragged

  const onMouseDown = (e) => {
    setIsDown(true);
    if (sliderRef.current) sliderRef.current.classList.add("active");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    if (sliderRef.current) sliderRef.current.classList.remove("active");
  };

  const onMouseUp = () => {
    setIsDown(false);
    if (sliderRef.current) sliderRef.current.classList.remove("active");

    setCurrentIndex(currentIndex + 1);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    if (!isDown) return;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Adjust scroll speed as needed

    const newScrollLeft = scrollLeft - walk;
    sliderRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };
  console.log(currentIndex);
  return (
    <section
      className="slider"
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {slideData?.map((data, index) => (
        <div
          key={data.id}
          className={`slide ${index === currentIndex ? "current-slide" : ""}`}
          style={{
            background: `url(${TMDB_ASSET_BASEURL}${data?.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container">
            <div className="wrapper">
              <ShowDetails tmdbID={data.id} allowLinkTitle={false} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Slider;
