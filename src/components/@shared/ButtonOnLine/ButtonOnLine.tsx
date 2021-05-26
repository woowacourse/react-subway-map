import PropTypes from 'prop-types';
import React, { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import Button from '../../@common/Button/Button';
import { ButtonOnLineContainer } from './ButtonOnLine.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonOnLine: FC<Props> = ({ children, onClick }) => {
  return (
    <ButtonOnLineContainer>
      <Button onClick={onClick} buttonType="round">
        {children}
      </Button>
    </ButtonOnLineContainer>
  );
};

ButtonOnLine.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default ButtonOnLine;
