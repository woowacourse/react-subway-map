import React from "react";
import PropTypes from "prop-types";

import Select from "../@shared/Select";

const ListSelect = ({ list, placeholder, value, onChange }) => (
  <Select value={value} onChange={onChange}>
    <option hidden>{placeholder}</option>
    {list.map(({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </Select>
);

ListSelect.propTypes = {
  ...Select.propTypes,
  placeholder: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ListSelect.defaultProps = {
  placeholder: null,
};

export default ListSelect;
