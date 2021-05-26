import PropTypes from 'prop-types';
import React, { FC, InputHTMLAttributes } from 'react';
import { ColorRadioInput, ColorRadioLabel, ColorRadioLabelText } from './ColorRadio.styles';

interface LabelText {
  text: string;
  isVisible: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  groupName: string;
  radioColor: string;
  labelText?: LabelText;
}

const ColorRadio: FC<Props> = ({
  groupName,
  radioColor,
  labelText,
  checked = false,
  ...options
}) => {
  return (
    <ColorRadioLabel>
      <ColorRadioInput
        type="radio"
        name={groupName}
        radioColor={radioColor}
        checked={checked}
        {...options}
      />
      {labelText && <ColorRadioLabelText>{labelText.text}</ColorRadioLabelText>}
    </ColorRadioLabel>
  );
};

ColorRadio.propTypes = {
  groupName: PropTypes.string.isRequired,
  radioColor: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  labelText: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }),
};

export default ColorRadio;
