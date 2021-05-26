import React from 'react';
import { Container } from './style';
import { PropTypes } from 'prop-types';

const Selector = ({
  label,
  size,
  name,
  defaultOption,
  value,
  options,
  ...attrs
}) => (
  <Container size={size}>
    <label htmlFor={name}>{label}</label>
    <select name={name} defaultValue={value} {...attrs}>
      <option value="" disabled>
        {defaultOption}
      </option>
      {options.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  </Container>
);

Selector.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Selector;
