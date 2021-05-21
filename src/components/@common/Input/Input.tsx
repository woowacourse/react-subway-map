import { InputHTMLAttributes, useRef, VFC } from 'react';
import { InputLabel, StyledInput, LabelText } from './Input.styles';

const Input: VFC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <InputLabel>
      <StyledInput {...props} />
      {props.value && <LabelText>{props.placeholder}</LabelText>}
    </InputLabel>
  );
};

export default Input;
