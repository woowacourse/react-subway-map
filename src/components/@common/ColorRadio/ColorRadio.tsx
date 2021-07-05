import React, { InputHTMLAttributes } from 'react';
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

const ColorRadio = ({
  groupName,
  radioColor,
  labelText,
  checked = false,
  ...options
}: Props): JSX.Element => {
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


export default ColorRadio;
