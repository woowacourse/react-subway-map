import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteStationById } from "../../pages/Stations/slice";
import Button from "../@shared/Button";

const StationsListItem = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    if (window.confirm(`${name}를 삭제하시겠습니까?`)) {
      dispatch(deleteStationById(id));
    }
  };

  return (
    <li className="flex items-center justify-between p-2 text-gray-600 text-xl">
      <span>{name}</span>
      <Button
        type="button"
        theme="icon"
        size="auto"
        onClick={handleDeleteClick}
      >
        🗑
      </Button>
    </li>
  );
};

StationsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default StationsListItem;
