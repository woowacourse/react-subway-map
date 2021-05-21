import React from 'react';
import { Container } from './style';

const Button = ({ disabled, backgroundColor, hasShadow, ...attrs }) => {
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

export default Button;
