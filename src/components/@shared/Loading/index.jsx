import React from "react";
import PropTypes from "prop-types";
import { PulseSpinner } from "react-spinners-kit";
import cx from "classnames";

const BG_OPACITY_STYLE = {
  0: "bg-opacity-0",
  5: "bg-opacity-5",
  10: "bg-opacity-10",
  20: "bg-opacity-20",
  25: "bg-opacity-25",
  30: "bg-opacity-30",
  40: "bg-opacity-40",
  50: "bg-opacity-50",
  60: "bg-opacity-60",
  70: "bg-opacity-70",
  75: "bg-opacity-75",
  80: "bg-opacity-80",
  90: "bg-opacity-90",
  95: "bg-opacity-95",
  100: "bg-opacity-100",
};

const Loading = ({ isLoading, bgOpacity }) =>
  isLoading && (
    <div
      className={cx(
        "absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black",
        BG_OPACITY_STYLE[bgOpacity]
      )}
    >
      <PulseSpinner color="#fbbf24" loading />
    </div>
  );

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  bgOpacity: PropTypes.oneOf(Object.keys(BG_OPACITY_STYLE)),
};

Loading.defaultProps = {
  bgOpacity: "40",
};

export default Loading;
