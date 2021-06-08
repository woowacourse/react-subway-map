import React, { FC } from 'react';
import { HiddenLabelText, StyledHiddenLabel } from './HiddenLabel.styles';
import PropTypes from 'prop-types';

interface Props {
  children: React.ReactNode;
  className?: string;
  labelText: string;
}

const HiddenLabel: FC<Props> = ({ children, className, labelText }) => {
  return (
    <StyledHiddenLabel className={className}>
      <HiddenLabelText>{labelText}</HiddenLabelText>
      {children}
    </StyledHiddenLabel>
  );
};

export default HiddenLabel;
