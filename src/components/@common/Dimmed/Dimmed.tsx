import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { StyledDimmed } from './Dimmed.styled';

interface Props {
  backgroundColor?: string;
  onMouseDown?: MouseEventHandler;
}

const Dimmed = ({
  children,
  backgroundColor = 'rgba(0, 0, 0, 0.3)',
}: PropsWithChildren<Props>): JSX.Element => {
  return <StyledDimmed backgroundColor={backgroundColor}>{children}</StyledDimmed>;
};

export default Dimmed;
