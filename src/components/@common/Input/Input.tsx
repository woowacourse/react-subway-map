import PropTypes from 'prop-types';
import React, { FC, InputHTMLAttributes } from 'react';
import { LabelIcon, LabelText, StyledLabel } from './Input.styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelIcon?: React.ReactNode;
}

const Input: FC<Props> = ({ labelText, labelIcon, ...option }) => {
  return (
    <StyledLabel>
      {labelText && <LabelText>{labelText}</LabelText>}
      {labelIcon && <LabelIcon>{labelIcon}</LabelIcon>}
      <input {...option} />
    </StyledLabel>
  );
};

Input.propTypes = {
  labelText: PropTypes.string,
  labelIcon: PropTypes.node,
};

export default Input;
