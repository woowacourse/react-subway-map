import React from "react";
import PropTypes from "prop-types";
import LineItems from "../LineItems";

const LinesList = ({ lineList }) =>
  lineList.length > 0 && (
    <ul className="mt-4">
      {[...lineList].reverse().map(({ id, name, color }) => (
        <LineItems key={id} id={id} name={name} color={color} />
      ))}
    </ul>
  );

LinesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  lineList: PropTypes.arrayOf(LineItems.propTypes).isRequired,
};

export default LinesList;
