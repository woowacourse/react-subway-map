import React from "react";
import PropTypes from "prop-types";

const OverviewList = ({ list }) => {
  console.log(list);

  return <ul>OverviewList</ul>;
};

OverviewList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array.isRequired,
};

export default OverviewList;
