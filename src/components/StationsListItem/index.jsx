import React from "react";
import PropTypes from "prop-types";
import Button from "../@shared/Button";

const StationsListItem = ({ id, name, onClick }) => (
  <li className="flex items-center justify-between p-2 text-gray-600 text-xl">
    <span>{name}</span>
    <Button
      type="button"
      theme="icon"
      size="auto"
      name={id}
      value={name}
      onClick={onClick}
    >
      🗑
    </Button>
  </li>
);

StationsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StationsListItem;
