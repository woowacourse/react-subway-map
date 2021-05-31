import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const SIZE_STYLE = {
  large: "w-36",
  medium: "w-24 h-12",
  small: "w-20",
  full: "w-full",
  auto: "w-auto",
};

const THEME_STYLE = {
  primary: "p-3 bg-yellow-300 hover:bg-yellow-400",
  secondary: "p-3 bg-gray-50 hover:bg-gray-100",
  round: "p-3 bg-gray-50 hover:bg-gray-100 rounded-3xl",
  icon: "bg-transparent hover:scale-110 transform focus:opacity-100 focus:text-black hover:text-black focus:outline-none hover:opacity-100  opacity-60",
};

const Button = ({
  type,
  children,
  disabled,
  size,
  theme,
  onClick,
  name,
  value,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}
    name={name}
    className={cx(
      " disabled:text-gray-400 text-gray-700 text-base font-medium disabled:bg-gray-200 rounded focus:outline-none",
      SIZE_STYLE[size],
      THEME_STYLE[theme]
    )}
    onClick={onClick}
    value={value}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(Object.keys(SIZE_STYLE)).isRequired,
  theme: PropTypes.oneOf(Object.keys(THEME_STYLE)).isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
