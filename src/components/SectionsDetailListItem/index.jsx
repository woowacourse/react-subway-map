import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteSection } from "../../pages/Lines/slice";
import Button from "../@shared/Button";
import useBoolean from "../../hooks/useBoolean";
import Confirm from "../@shared/Confirm";

const SectionsDetailListItem = ({ stationId, stationName, lineId }) => {
  const dispatch = useDispatch();
  const [isOpen, open, close] = useBoolean(false);

  const handleConfirm = () => {
    dispatch(deleteSection({ lineId, stationId }));
    close();
  };

  const confirmMessage = `${stationName}를 삭제하시겠습니까?`;

  return (
    <li className="flex justify-between px-8 py-4">
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onReject={close}
        message={confirmMessage}
      />
      <span>{stationName}</span>
      <Button type="button" theme="icon" size="auto" onClick={open}>
        🗑
      </Button>
    </li>
  );
};

SectionsDetailListItem.propTypes = {
  lineId: PropTypes.number.isRequired,
  stationId: PropTypes.number.isRequired,
  stationName: PropTypes.string.isRequired,
};

export default SectionsDetailListItem;
