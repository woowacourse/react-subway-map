import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectLineList } from "../../pages/Lines/slice";
import Select from "../@shared/Select";

const SectionsLineSelect = ({ disabled, lineId, onChange }) => {
  const lineList = useSelector(selectLineList);

  return (
    <Select onChange={onChange} value={lineId} disabled={disabled}>
      <option hidden>노선 선택</option>
      {[...lineList].reverse().map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};

SectionsLineSelect.propTypes = {
  disabled: PropTypes.bool,
  lineId: PropTypes.string,
  onChange: PropTypes.func,
};

SectionsLineSelect.defaultProps = {
  disabled: false,
  lineId: null,
  onChange: null,
};

export default SectionsLineSelect;
