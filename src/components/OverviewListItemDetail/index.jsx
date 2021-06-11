import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const formatDistance = (dist) => dist.toLocaleString("en-US");

const OverviewListItemDetail = ({ lineColor, sections }) => (
  <ol className="flex flex-wrap">
    {sections.map(({ upStation, downStation, distance }, index) => (
      <li key={upStation.id} className="flex items-center my-2">
        {index === 0 && <span>{upStation.name}</span>}
        <div className="flex flex-col items-center mx-2 text-xs">
          <span>{formatDistance(distance)}km</span>
          <span className={cx("block w-14 h-1", lineColor)} />
        </div>
        <span>{downStation.name}</span>
      </li>
    ))}
  </ol>
);

OverviewListItemDetail.propTypes = {
  lineColor: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      upStation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      downStation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      distance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default OverviewListItemDetail;
