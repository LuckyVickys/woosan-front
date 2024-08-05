import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TogglePassword = ({ isVisible, toggleVisibility }) => {
  return (
    <button
      type="button"
      className="toggle-password-button"
      onClick={toggleVisibility}
    >
      {isVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default TogglePassword;
