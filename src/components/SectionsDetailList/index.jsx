import React from "react";
import PropTypes from "prop-types";
import SectionsDetailListItem from "../SectionsDetailListItem";

const SectionsDetailList = ({ stations, lineId }) =>
  stations.length > 0 && (
    <ul className="py-2 text-gray-600">
      {stations.map(({ id, name }) => (
        <SectionsDetailListItem
          key={id}
          lineId={lineId}
          stationId={id}
          stationName={name}
        />
      ))}
    </ul>
  );

SectionsDetailList.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  lineId: PropTypes.number.isRequired,
};

export default SectionsDetailList;
