import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import OverviewListItemDetail from "../OverviewListItemDetail";

const formatDistance = (dist) => dist.toLocaleString("en-US");

const OverviewListItem = ({ item }) => {
  const {
    name: lineName,
    color: lineColor,
    distance: totalDistance,
    sections,
  } = item;

  return (
    <li className="space-y-2">
      <div className="flex justify-between">
        <div className="flex">
          <span className={cx("block mr-2 w-5 h-5 rounded-full", lineColor)} />
          <span className="text-xl font-bold">{lineName}</span>
        </div>
        <span className="text-lg font-semibold">
          총 거리: {formatDistance(totalDistance)}km
        </span>
      </div>
      <OverviewListItemDetail sections={sections} lineColor={lineColor} />
    </li>
  );
};

OverviewListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    sections: OverviewListItemDetail.propTypes.sections,
    color: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
  }).isRequired,
};

export default OverviewListItem;
