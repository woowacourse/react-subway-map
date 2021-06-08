import React, { useEffect } from 'react';
import { Container } from './style';
import { PropTypes } from 'prop-types';
import { REG_EXP, SIZE } from '../../../constants';

const Selector = ({ label, size, name, defaults, options, ...attrs }) => {
  useEffect(() => {
    if (!REG_EXP.ENG.test(name)) {
      console.warn('name should be written by english.');
    }
  });

  return (
    <Container size={size}>
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} name={name} {...attrs}>
        {defaults && (
          <option value={defaults.value} disabled={defaults.disabled}>
            {defaults.option}
          </option>
        )}
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </Container>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaults: PropTypes.shape({
    value: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Selector.defaultProps = {
  size: SIZE.MD,
};

export default Selector;
