import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import SectionsDetailList from "../SectionsDetailList";

const SectionsDetail = ({ detail }) => {
  const { name, color, stations, id } = detail ?? {};

  return (
    detail && (
      <div className="border rounded-md">
        <h3
          className={cx("pl-4 py-2 text-gray-800 text-xl rounded-t-md", color)}
        >
          {name}
        </h3>
        <SectionsDetailList stations={stations} lineId={id} />
      </div>
    )
  );
};

SectionsDetail.propTypes = {
  detail: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stations: PropTypes.string.isRequired,
  }),
};

SectionsDetail.defaultProps = {
  detail: null,
};

export default SectionsDetail;
