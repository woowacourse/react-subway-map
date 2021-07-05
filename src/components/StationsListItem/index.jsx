import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import useBoolean from "../../hooks/useBoolean";
import { deleteStationById } from "../../pages/Stations/slice";
import Button from "../@shared/Button";
import Confirm from "../@shared/Confirm";

const StationsListItem = ({ id, name }) => {
  const dispatch = useDispatch();
  const [isOpen, open, close] = useBoolean(false);

  const handleConfirm = () => {
    dispatch(deleteStationById(id));
    close();
  };

  const confirmMessage = `${name}를 삭제하시겠습니까?`;

  return (
    <li className="flex items-center justify-between p-2 text-gray-600 text-xl">
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onReject={close}
        message={confirmMessage}
      />
      <span>{name}</span>
      <Button type="button" theme="icon" size="auto" onClick={open}>
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
