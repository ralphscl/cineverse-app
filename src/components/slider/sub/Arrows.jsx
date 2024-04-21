import React from "react";
import { motion } from "framer-motion";
import "./Arrows.css";

const Arrows = ({ prevSlide, nextSlide }) => {
  return (
    <motion.div className="arrows">
      <motion.div
        className="left-arrow"
        onClick={prevSlide}
        whileHover={{ scale: 1.2 }}
        whileTap={{ translateX: -5 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {"<"}
      </motion.div>
      <motion.div
        className="right-arrow"
        onClick={nextSlide}
        whileHover={{ scale: 1.2 }}
        whileTap={{ translateX: 5 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {">"}
      </motion.div>
    </motion.div>
  );
};

export default Arrows;
