import React from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectStationList } from "../../pages/Stations/slice";
import Select from "../@shared/Select";

const SectionsStationSelect = ({ optionValue, onChange, value }) => {
  const stationList = useSelector(selectStationList);

  return (
    <Select value={value} onChange={onChange}>
      <option hidden>{optionValue}</option>
      {stationList.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};

SectionsStationSelect.propTypes = {
  optionValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SectionsStationSelect;
