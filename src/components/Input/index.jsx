import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, onFocus }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="px-4 py-2 w-full bg-transparent border rounded outline-none focus:ring-yellow-300 focus:ring-2"
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
