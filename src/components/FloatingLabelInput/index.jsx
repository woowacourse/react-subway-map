import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Input from "../Input";

const FloatingLabelInput = ({ id, type, label }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  return (
    <div className="relative w-full isolate">
      <Input id={id} type={type} onFocus={handleInputFocus} />
      <label
        htmlFor={id}
        className={cx(
          "absolute -z-1 text-gray-400 transition-all duration-300",
          isFocused ? "-top-6 left-0 text-sm " : "left-4 top-2 text-xl"
        )}
      >
        {label}
      </label>
    </div>
  );
};

FloatingLabelInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

export default FloatingLabelInput;
