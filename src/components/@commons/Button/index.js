import React from 'react';
import { Container } from './style';
import PropTypes from 'prop-types';

const Button = ({ backgroundColor, hasShadow, ...attrs }) => {
  return (
    <Container backgroundColor={backgroundColor} hasShadow={hasShadow}>
      <button {...attrs}></button>
    </Container>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  hasShadow: PropTypes.bool,
};

export default Button;
