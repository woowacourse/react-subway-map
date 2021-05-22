import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, onFocus }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="px-4 py-2 w-full bg-transparent rounded outline-none ring-gray-300 focus:ring-yellow-300 ring-1 focus:ring-2"
    onFocus={onFocus}
  />
);

Input.propTypes = {
  type: PropTypes.oneOf(["number", "text", "email", "password"]).isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  placeholder: null,
  onFocus: null,
};

export default Input;
