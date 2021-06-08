import React, { InputHTMLAttributes, VFC } from 'react';
import HiddenDiv from '../a11y/HiddenDiv/HiddenDiv';
import { ColorRadioInput, ColorRadioLabel, ColorRadioLabelText } from './ColorRadio.styles';

interface LabelText {
  text: string;
  isVisible: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  groupName: string;
  radioColor: string;
  labelText: LabelText;
}

const ColorRadio: VFC<Props> = ({
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
      {labelText.isVisible ? (
        <ColorRadioLabelText>{labelText.text}</ColorRadioLabelText>
      ) : (
        <HiddenDiv>{labelText.text}</HiddenDiv>
      )}
    </ColorRadioLabel>
  );
};

export default ColorRadio;
