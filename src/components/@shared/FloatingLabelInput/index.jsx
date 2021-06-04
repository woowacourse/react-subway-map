import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Input from "../Input";

const FloatingLabelInput = ({ id, type, label, value, onChange, isValid }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  return (
    <div className="relative flex items-center w-full isolate">
      <label
        htmlFor={id}
        className={cx(
          "absolute -z-1 text-gray-400 transition-all duration-300",
          isFocused || value ? "-top-6 left-0 text-sm " : "left-4 top-2 text-xl"
        )}
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        onFocus={handleInputFocus}
        value={value}
        onChange={onChange}
        isValid={isValid}
      />
    </div>
  );
};

FloatingLabelInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
};

FloatingLabelInput.defaultProps = {
  isValid: true,
};

export default FloatingLabelInput;
