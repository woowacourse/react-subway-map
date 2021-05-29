import React from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { deleteStationById } from "../../pages/Stations/slice";
import StationsListItem from "../StationsListItem";

const StationsList = ({ list }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (event) => {
    const { name: id, value } = event.target;

    if (window.confirm(`${value}를 삭제하시겠습니까?`)) {
      dispatch(deleteStationById(id));
    }
  };

  return (
    list.length > 0 && (
      <ul className="mt-8 pb-8 pl-8 pr-6 py-4 w-144 rounded-sm shadow-md space-y-6">
        {[...list].reverse().map(({ id, name }) => (
          <StationsListItem
            key={id}
            id={id}
            name={name}
            onClick={handleDeleteClick}
          />
        ))}
      </ul>
    )
  );
};

StationsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StationsList;
