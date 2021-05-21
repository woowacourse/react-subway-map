import React from 'react';
import { Container } from './style';
import PropTypes from 'prop-types';

const Button = ({ backgroundColor, disabled, hasShadow, ...attrs }) => {
  return (
    <Container
      disabled={disabled}
      backgroundColor={backgroundColor}
      hasShadow={hasShadow}
    >
      <button disabled={disabled} {...attrs}></button>
    </Container>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  hasShadow: PropTypes.bool,
};

export default Button;
