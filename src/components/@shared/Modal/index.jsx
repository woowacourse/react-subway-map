import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children }) => (
  <div className="absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
    <div>{children}</div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
