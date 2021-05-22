import React from 'react';
import { PropTypes } from 'prop-types';

import { Container, RadioButton, CheckMark } from './style';

export const ButtonRadio = (props) => {
  const { isChecked, value, name, onChange } = props;

  return (
    <Container>
      <RadioButton type="radio" name={name} value={value} checked={isChecked} onChange={onChange} />
      <CheckMark />
    </Container>
  );
};

ButtonRadio.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
