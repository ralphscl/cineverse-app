import { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, selectedOption, onChangeOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectOption = (option) => {
    onChangeOption(option)
    toggleDropdown();
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dropdown' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <div className='header'>
        {selectedOption ? selectedOption.name : "Select a Genre"}
        <i className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </div>
      {isOpen && (
        <ul className="options">
          {options.map(({ name, id }) => (
            <li
              key={name}
              className={`option ${id === selectedOption?.id ? 'selected' : ''}`}
              onClick={() => onSelectOption(id === selectedOption?.id ? '' : { id, name })}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
