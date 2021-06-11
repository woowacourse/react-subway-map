import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const formatDistance = (dist) => dist.toLocaleString("en-US");

const OverviewListItem = ({ item }) => {
  const {
    name: lineName,
    stations,
    color: lineColor = "bg-black",
    distance,
  } = item;

  return (
    <li className="space-y-2">
      <div className="flex justify-between">
        <div className="flex">
          <div className={cx("mr-2 w-5 h-5 rounded-full", lineColor)} />
          <span className="text-xl font-bold">{lineName}</span>
        </div>
        <span className="text-lg font-semibold">
          총 거리: {formatDistance(distance)}km
        </span>
      </div>
      <ol className="flex flex-wrap">
        {stations.map(({ id, name }, index) => (
          <li key={id} className="flex items-center my-2">
            {index > 0 && <div className={cx("mx-2 w-4 h-1", lineColor)} />}
            <span>{name}</span>
          </li>
        ))}
      </ol>
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
    color: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
  }).isRequired,
};

export default OverviewListItem;
