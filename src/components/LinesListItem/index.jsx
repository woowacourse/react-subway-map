import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDispatch } from "react-redux";
import useBoolean from "../../hooks/useBoolean";
import { deleteLinesById } from "../../pages/Lines/slice";
import Button from "../@shared/Button";
import Confirm from "../@shared/Confirm";

const LinesListItem = ({ id, name, color }) => {
  const dispatch = useDispatch();
  const [isOpen, open, close] = useBoolean(false);

  const handleConfirm = () => {
    dispatch(deleteLinesById(id));
    close();
  };

  const confirmMessage = `${name}를 삭제하시겠습니까?`;

  return (
    <li className="flex items-center justify-between mt-5 mx-6 pb-1 text-gray-600 text-xl border-b">
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onReject={close}
        message={confirmMessage}
      />
      <div className="flex items-center">
        <span className={cx("block mr-2 w-5 h-5 rounded-full", color)} />
        <span>{name}</span>
      </div>
      <Button type="button" theme="icon" size="auto" onClick={open}>
        🗑
      </Button>
    </li>
  );
};

LinesListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LinesListItem;
