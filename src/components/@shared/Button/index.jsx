import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const SIZE_STYLE = {
  large: "w-36",
  medium: "w-24 h-12",
  small: "w-20",
  full: "w-full",
};

const THEME_STYLE = {
  primary: "bg-yellow-300 hover:bg-yellow-400",
  secondary: "bg-gray-50 hover:bg-gray-100",
  round: "bg-gray-50 hover:bg-gray-100 rounded-3xl",
};

const Button = ({ type, children, disabled, size, theme, onClick, name }) => (
  <button
    type={type === "submit" ? "submit" : "button"}
    disabled={disabled}
    name={name}
    className={cx(
      "p-3 disabled:text-gray-400 text-gray-700 text-base font-medium disabled:bg-gray-200 rounded focus:outline-none",
      SIZE_STYLE[size],
      THEME_STYLE[theme]
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(SIZE_STYLE)),
  theme: PropTypes.oneOf(Object.keys(THEME_STYLE)),
  onClick: PropTypes.func,
  name: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  size: "full",
  theme: "primary",
  onClick: null,
  name: null,
};

export default Button;
