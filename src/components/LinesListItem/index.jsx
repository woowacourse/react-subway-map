import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { deleteLinesById } from "../../pages/Lines/slice";
import Button from "../@shared/Button";

const LinesListItem = ({ id, name, color }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    if (window.confirm(`${name}를 삭제하시겠습니까?`)) {
      dispatch(deleteLinesById(id));
    }
  };

  return (
    <li className="flex items-center justify-between mt-5 mx-6 pb-1 text-gray-600 text-xl border-b">
      <div className="flex items-center">
        <span
          className={cx("block mr-2 w-5 h-5 bg-blue-400 rounded-full", color)}
        />
        <span>{name}</span>
      </div>
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

LinesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LinesListItem;
