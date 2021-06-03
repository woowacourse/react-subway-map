/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";

const Dimmer = ({ onClick, children }) => (
  <div
    role="dialog"
    onClick={onClick}
    className="absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40"
  >
    {children}
  </div>
);

Dimmer.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dimmer;
