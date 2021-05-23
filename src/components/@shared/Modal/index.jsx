/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, onClick }) => (
  <div
    className="absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40"
    onClick={onClick}
  >
    <div>{children}</div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
