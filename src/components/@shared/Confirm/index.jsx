import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import useFocus from "../../../hooks/useFocus";
import Button from "../Button";

const Confirm = ({ message, onConfirm, onReject, isOpen, className }) => {
  const buttonRef = useFocus();

  return (
    (isOpen === true || (isOpen == null && Boolean(message))) && (
      <div className="fixed z-9999 left-0 top-0 flex items-center justify-center w-full h-full max-h-screen bg-black bg-opacity-10 isolate">
        <div className={cx("p-4 max-w-sm bg-white rounded-lg", className)}>
          <p className="whitespace-pre-line text-lg">{message}</p>
          <div className="flex gap-x-4 mt-4">
            <Button
              type="button"
              theme="secondary"
              className="bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:ring-gray-400 focus:ring-2"
              onClick={onReject}
            >
              취소
            </Button>
            <Button
              ref={buttonRef}
              type="button"
              theme="primary"
              onClick={onConfirm}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

Confirm.defaultProps = {
  isOpen: null,
  className: null,
};

export default Confirm;
