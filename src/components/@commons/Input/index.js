import React from 'react';
import { Container } from './style';
import { PropTypes } from 'prop-types';
import { SIZE } from '../../../constants';

const Input = ({ label, size, name, ...attrs }) => (
  <Container size={size}>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} name={name} {...attrs} />
  </Container>
);

Input.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  size: SIZE.MD,
};

export default Input;
