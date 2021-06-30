import React, { InputHTMLAttributes } from 'react';
import { LabelIcon, LabelText, StyledLabel } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelText?: string;
  labelIcon?: React.ReactNode;
}

const Input = ({ className, labelText, labelIcon, ...option }: InputProps): JSX.Element => {
  return (
    <StyledLabel className={className}>
      {labelText && <LabelText>{labelText}</LabelText>}
      {labelIcon && <LabelIcon>{labelIcon}</LabelIcon>}
      <input {...option} />
    </StyledLabel>
  );
};

export default Input;
