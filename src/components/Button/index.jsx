import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, children, disabled }) => (
  <button
    type={type === "submit" ? "submit" : "button"}
    disabled={disabled}
    className="p-3 disabled:text-gray-400 text-gray-700 font-medium disabled:bg-gray-200 bg-yellow-300 rounded"
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
