import React from "react";
import PropTypes from "prop-types";
import LinesListItem from "../LinesListItem";

const LinesList = ({ list }) =>
  list.length > 0 && (
    <ul className="mt-4">
      {[...list].reverse().map(({ id, name, color }) => (
        <LinesListItem key={id} id={id} name={name} color={color} />
      ))}
    </ul>
  );

LinesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.arrayOf(LinesListItem.propTypes).isRequired,
};

export default LinesList;
