/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import ModalPortal from "../../Portal/ModalPortal";

const Modal = ({ isOpen, children, close }) => {
  const handleClick = (event) => {
    const isDimmedClicked = event.currentTarget === event.target;

    if (isDimmedClicked) {
      close();
    }
  };

  return (
    isOpen && (
      <ModalPortal>
        <div
          className="absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40"
          onClick={handleClick}
        >
          <div>{children}</div>
        </div>
      </ModalPortal>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
