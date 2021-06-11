import React from "react";
import PropTypes from "prop-types";
import OverviewListItem from "../OverviewListItem/index";

const OverviewList = ({ list }) => (
  <ul className="space-y-6">
    {list.map((item) => (
      <OverviewListItem key={item.id} item={item} />
    ))}
  </ul>
);

OverviewList.propTypes = {
  list: PropTypes.arrayOf(OverviewListItem.propTypes.item).isRequired,
};

export default OverviewList;
