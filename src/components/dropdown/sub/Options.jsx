import React from "react";

const Options = ({ handleOptionSelect, children }) => {
  return (
    <div className="options">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onClick: handleOptionSelect,
        });
      })}
    </div>
  );
};

export default Options;
