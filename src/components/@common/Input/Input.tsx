import PropTypes from 'prop-types';
import React, { VFC, InputHTMLAttributes } from 'react';
import { LabelIcon, LabelText, StyledLabel } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelText?: string;
  labelIcon?: React.ReactNode;
}

const Input: VFC<InputProps> = ({ className, labelText, labelIcon, ...option }) => {
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
