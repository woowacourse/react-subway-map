import React, { FC, ReactNode } from 'react';
import Button from '../Button/Button';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const TransparentButton: FC<Props> = ({ onClick, children }) => {
  return (
    <Button type="button" isColored={false} onClick={onClick}>
      {children}
    </Button>
  );
};

export default TransparentButton;
