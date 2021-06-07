import React from "react";
import { PropTypes } from "prop-types";
import StationsListItem from "../StationsListItem";

const StationsList = ({ list }) =>
  list.length > 0 && (
    <ul className="mt-8 pb-8 pl-8 pr-6 py-4 w-144 rounded-sm shadow-md space-y-6">
      {[...list].reverse().map(({ id, name }) => (
        <StationsListItem key={id} id={id} name={name} />
      ))}
    </ul>
  );

StationsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StationsList;
