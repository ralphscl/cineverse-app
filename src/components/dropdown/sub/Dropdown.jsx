import React, { useState } from "react";
import Options from "./Options";
import "./Dropdown.css";

const Dropdown = ({ defaultOption, selectedOption, style, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value) => {
    selectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${style}`}>
      <div className="selected" onClick={toggleDropdown}>
        {defaultOption}
      </div>

      {isOpen && (
        <Options handleOptionSelect={handleOptionSelect} children={children} />
      )}
    </div>
  );
};

export default Dropdown;
