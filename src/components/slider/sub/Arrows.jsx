import React from "react";
import "./Arrows.css";

const Arrows = ({ prevSlide, nextSlide }) => {
  return (
    <div className="arrows">
      <div className="left-arrow" onClick={prevSlide}>
        {"<"}
      </div>
      <div className="right-arrow" onClick={nextSlide}>
        {">"}
      </div>
    </div>
  );
};

export default Arrows;
