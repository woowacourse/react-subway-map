import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import cx from "classnames";
import Button from "../@shared/Button";
import { deleteLinesById } from "../../pages/Lines/slice";

const LinesItems = ({ id, name, color }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (event) => {
    const { name: lineName, value: lineId } = event.target;

    if (window.confirm(`${lineName}를 삭제하시겠습니까?`)) {
      dispatch(deleteLinesById(lineId));
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
        disabled={false}
        theme="icon"
        size="auto"
        onClick={handleDeleteClick}
        name={name}
        value={id}
      >
        🗑
      </Button>
    </li>
  );
};

LinesItems.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LinesItems;
