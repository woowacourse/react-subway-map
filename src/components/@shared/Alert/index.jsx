import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import useFocus from "../../../hooks/useFocus";
import Button from "../Button";

const Alert = ({ message, onConfirm, isOpen, className }) => {
  const buttonRef = useFocus();

  return (
    (isOpen === true || (isOpen == null && Boolean(message))) && (
      <div className="fixed z-9999 left-0 top-0 flex items-center justify-center w-full h-full max-h-screen bg-black bg-opacity-10 isolate">
        <div className={cx("p-4 max-w-sm bg-white rounded-lg", className)}>
          <p className="whitespace-pre-line text-lg">{message}</p>
          <Button
            ref={buttonRef}
            type="button"
            className="mt-4"
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    )
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

Alert.defaultProps = {
  isOpen: null,
  className: null,
};

export default Alert;
