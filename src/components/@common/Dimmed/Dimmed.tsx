import React, { FC, ReactNode, HTMLAttributes } from 'react';
import { StyledDimmed } from './Dimmed.styled';
import PropTypes from 'prop-types';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  backgroundColor?: string;
}

const Dimmed: FC<Props> = ({ children, backgroundColor = 'rgba(0, 0, 0, 0.3)' }) => {
  return <StyledDimmed backgroundColor={backgroundColor}>{children}</StyledDimmed>;
};

Dimmed.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
};

export default Dimmed;
