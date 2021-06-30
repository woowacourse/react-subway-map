import PropTypes from 'prop-types';
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

Input.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  labelIcon: PropTypes.node,
};

export default Input;
