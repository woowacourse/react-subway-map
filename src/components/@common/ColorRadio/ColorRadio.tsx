import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { ColorRadioInput, ColorRadioLabelText } from './ColorRadio.styles';

interface Props {
  groupName: string;
  radioColor: string;
  isChecked: boolean;
  labelText?: string;
  onChange: () => void;
}

const ColorRadio: FC<Props> = ({
  groupName,
  radioColor,
  isChecked = false,
  labelText = '',
  onChange,
}) => {
  return (
    <label>
      <ColorRadioInput
        type="radio"
        name={groupName}
        value={radioColor}
        checked={isChecked}
        onChange={onChange}
        radioColor={radioColor}
      />
      <ColorRadioLabelText>{labelText}</ColorRadioLabelText>
    </label>
  );
};

ColorRadio.propTypes = {
  groupName: PropTypes.string.isRequired,
  radioColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColorRadio;
