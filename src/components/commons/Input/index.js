import React from 'react';
import { Container } from './style';

const Input = ({ label, size, name, ...attrs }) => (
  <Container size={size}>
    <label htmlFor={name}>{label}</label>
    <input name={name} {...attrs} />
  </Container>
);

export default Input;
