import React from "react";
import PropTypes from "prop-types";
import { PulseSpinner } from "react-spinners-kit";

const Loading = ({ isLoading }) =>
  isLoading && (
    <div className="absolute left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60">
      <PulseSpinner color="#fbbf24" loading />
    </div>
  );

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
