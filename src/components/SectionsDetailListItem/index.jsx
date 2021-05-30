import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../pages/Lines/slice";
import Button from "../@shared/Button";

const SectionsDetailListItem = ({ stationId, stationName, lineId }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    if (window.confirm(`${stationName}를 삭제하시겠습니까?`)) {
      dispatch(deleteSection({ lineId, stationId }));
    }
  };

  return (
    <li className="flex justify-between px-8 py-4">
      <span>{stationName}</span>
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

SectionsDetailListItem.propTypes = {
  lineId: PropTypes.string.isRequired,
  stationId: PropTypes.string.isRequired,
  stationName: PropTypes.string.isRequired,
};

export default SectionsDetailListItem;
