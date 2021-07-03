import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Button from "../Button";

const Alert = ({ isOpen, onConfirm, children, className }) =>
  isOpen && (
    <div className="fixed z-9999 left-0 top-0 flex items-center justify-center w-full h-full max-h-screen bg-black bg-opacity-10 isolate">
      <div className={cx("p-4 max-w-sm bg-white rounded-lg", className)}>
        {children}
        <Button type="button" className="mt-4" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </div>
  );

Alert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Alert.defaultProps = {
  className: null,
};

export default Alert;
