import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="px-4 py-2 border rounded outline-none focus:ring-yellow-300 focus:ring-2"
  />
);

Input.propTypes = {
  type: PropTypes.oneOf(["number", "text", "email", "password"]).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
