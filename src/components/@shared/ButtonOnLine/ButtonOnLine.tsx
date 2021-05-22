import PropTypes from 'prop-types';
import React, { FC } from 'react';
import Button from '../../@common/Button/Button';
import { ButtonOnLineContainer } from './ButtonOnLine.styles';

interface Props {
  children: React.ReactNode;
}

const ButtonOnLine: FC<Props> = ({ children }) => {
  return (
    <ButtonOnLineContainer>
      <Button buttonType="round">{children}</Button>
    </ButtonOnLineContainer>
  );
};

ButtonOnLine.propTypes = {
  children: PropTypes.node,
};

export default ButtonOnLine;
