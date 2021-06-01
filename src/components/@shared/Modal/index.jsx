/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import ModalPortal from "../../Portal/ModalPortal";
import Dimmer from "../Dimmer";

const Modal = ({ isOpen, children, onClose }) => {
  const handleClick = (event) => {
    const isDimmedClicked = event.currentTarget === event.target;

    if (isDimmedClicked) {
      onClose();
    }
  };

  return (
    isOpen && (
      <ModalPortal>
        <Dimmer onClick={handleClick}>
          <div>{children}</div>
        </Dimmer>
      </ModalPortal>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
