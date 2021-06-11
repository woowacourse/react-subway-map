import React, { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import Button from '../../@common/Button/Button';
import { ButtonOnLineContainer } from './ButtonOnLine.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  'aria-lable'?: string;
}

const ButtonOnLine: FC<Props> = ({ children, onClick, 'aria-label': ariaLabel }) => {
  return (
    <ButtonOnLineContainer>
      <Button onClick={onClick} aria-label={ariaLabel} buttonType="round">
        {children}
      </Button>
    </ButtonOnLineContainer>
  );
};

export default ButtonOnLine;
