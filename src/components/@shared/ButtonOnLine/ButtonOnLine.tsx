import React, { MouseEventHandler, PropsWithChildren } from 'react';
import Button from '../../@common/Button/Button';
import { ButtonOnLineContainer } from './ButtonOnLine.styles';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonOnLine = ({ children, onClick }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <ButtonOnLineContainer>
      <Button onClick={onClick} buttonShape="round">
        {children}
      </Button>
    </ButtonOnLineContainer>
  );
};

export default ButtonOnLine;
