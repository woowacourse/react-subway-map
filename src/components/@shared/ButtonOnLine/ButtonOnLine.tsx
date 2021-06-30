import PropTypes from 'prop-types';
import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';
import Button from '../../@common/Button/Button';
import { ButtonOnLineContainer } from './ButtonOnLine.styles';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonOnLine: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
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
