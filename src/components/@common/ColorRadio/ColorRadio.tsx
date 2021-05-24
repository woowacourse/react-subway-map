import PropTypes from 'prop-types';
import React, { ChangeEventHandler, FC } from 'react';
import { ColorRadioInput, ColorRadioLabel, ColorRadioLabelText } from './ColorRadio.styles';

interface LabelText {
  text: string;
  isVisible: boolean;
}

interface Props {
  groupName: string;
  value: string;
  radioColor: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  labelText?: LabelText;
}

const ColorRadio: FC<Props> = ({
  groupName,
  value,
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
        value={value}
        checked={isChecked}
        onChange={onChange}
        radioColor={radioColor}
      />
      {labelText && <ColorRadioLabelText>{labelText.text}</ColorRadioLabelText>}
    </ColorRadioLabel>
  );
};

ColorRadio.propTypes = {
  groupName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  radioColor: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  labelText: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
};

export default ColorRadio;
