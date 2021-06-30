import PropTypes from 'prop-types';
import React, { FC, PropsWithChildren } from 'react';
import { StyledDimmed } from './Dimmed.styled';

interface Props {
  backgroundColor?: string;
}

const Dimmed: FC<PropsWithChildren<Props>> = ({
  children,
  backgroundColor = 'rgba(0, 0, 0, 0.3)',
}) => {
  return <StyledDimmed backgroundColor={backgroundColor}>{children}</StyledDimmed>;
};

Dimmed.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
};

export default Dimmed;
