import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { ColorRadioInput, ColorRadioLabel, ColorRadioLabelText } from './ColorRadio.styles';

interface LabelText {
  text: string;
  isVisible: boolean;
}

interface Props {
  groupName: string;
  radioColor: string;
  isChecked: boolean;
  onChange: () => void;
  labelText: LabelText;
}

const ColorRadio: FC<Props> = ({
  groupName,
  radioColor,
  isChecked = false,
  labelText,
  onChange,
}) => {
  return (
    <ColorRadioLabel>
      <ColorRadioInput
        type="radio"
        name={groupName}
        value={radioColor}
        checked={isChecked}
        onChange={onChange}
        radioColor={radioColor}
      />
      {labelText.isVisible && <ColorRadioLabelText>{labelText.text}</ColorRadioLabelText>}
    </ColorRadioLabel>
  );
};

ColorRadio.propTypes = {
  groupName: PropTypes.string.isRequired,
  radioColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  labelText: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorRadio;
