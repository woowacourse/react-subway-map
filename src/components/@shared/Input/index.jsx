import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const getRingColor = (isFocused, isValid) => {
  if (isFocused && !isValid) {
    return "focus:ring-red-500 ring-red-500";
  }

  return "focus:ring-yellow-300 ring-gray-300";
};

const Input = ({ type, placeholder, onFocus, onChange, isValid, value }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cx(
        "px-4 py-2 w-full bg-transparent rounded outline-none ring-1 focus:ring-2",
        getRingColor(isFocused, isValid)
      )}
      onFocus={handleFocus}
      onChange={onChange}
      value={value}
    />
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["number", "text", "email", "password"]).isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  value: PropTypes.string,
};

Input.defaultProps = {
  placeholder: null,
  onFocus: null,
  onChange: null,
  isValid: false,
  value: "",
};

export default Input;
