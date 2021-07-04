import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const getRingColor = (isFocused, isValid) => {
  if (isFocused && !isValid) {
    return "focus:ring-red-500 ring-red-500";
  }

  return "focus:ring-yellow-300 ring-gray-300";
};

const Input = forwardRef((props, ref) => {
  const {
    onFocus,
    isValid,
    label,
    id,
    type,
    placeholder,
    onChange,
    value,
    autoComplete,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  return (
    <>
      {label && (
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cx(
          "px-4 py-2 w-full bg-transparent rounded outline-none ring-1 focus:ring-2",
          getRingColor(isFocused, isValid)
        )}
        onFocus={handleFocus}
        {...{ id, type, placeholder, onChange, value, autoComplete }}
      />
    </>
  );
});

Input.propTypes = {
  type: PropTypes.oneOf(["number", "text", "email", "password"]).isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
};

Input.defaultProps = {
  placeholder: null,
  onFocus: null,
  onChange: null,
  isValid: false,
  value: "",
  label: null,
  autoComplete: null,
};

export default Input;
