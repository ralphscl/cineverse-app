import React from "react";
import { motion } from "framer-motion";
import "./Dots.css";

const Dots = ({ slideData, currentIndex, setCurrentIndex }) => {
  return (
    <div className="dots">
      {slideData?.map((data, index) => (
        <motion.span
          key={data?.id}
          className="circle"
          onClick={() => setCurrentIndex(index)}
        >
          <motion.div
            className="dot"
            initial={{ scale: 0 }}
            animate={{ scale: currentIndex === index ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          ></motion.div>
        </motion.span>
      ))}
    </div>
  );
};

export default Dots;
