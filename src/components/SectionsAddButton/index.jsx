import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const SectionsAddButton = ({ disabled, onClick }) => (
  <button
    type="button"
    className={cx(
      "absolute -top-7 right-0 w-14 h-14 text-3xl rounded-full focus:outline-none shadow-md",
      disabled ? "bg-gray-300" : "bg-yellow-300 hover:bg-yellow-400 "
    )}
    onClick={onClick}
    aria-label="add-button"
    disabled={disabled}
  >
    +
  </button>
);

SectionsAddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SectionsAddButton.defaultProps = {
  disabled: false,
};

export default SectionsAddButton;
