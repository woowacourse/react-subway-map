/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";
import { yellow } from "tailwindcss/colors";
import { PulseSpinner } from "react-spinners-kit";

const Loading = ({ isLoading, color, size, sizeUnit }) =>
  isLoading && (
    <div className="fixed z-9999 left-0 top-0 flex items-center justify-center w-full h-full max-h-screen">
      <PulseSpinner loading {...{ color, size, sizeUnit }} />
    </div>
  );

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  sizeUnit: PropTypes.string,
};

Loading.defaultProps = {
  color: yellow[400],
  size: 3,
  sizeUnit: "rem",
};

export default Loading;
