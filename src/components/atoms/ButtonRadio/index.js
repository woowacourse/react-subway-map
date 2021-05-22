import React from 'react';
import { PropTypes } from 'prop-types';

import { RadioButton, Border, CheckMark } from './style';

export const ButtonRadio = (props) => {
  const { isChecked, value, name, onChange } = props;

  return (
    <Border>
      <RadioButton type="radio" name={name} value={value} checked={isChecked} onChange={onChange} />
      <CheckMark />
    </Border>
  );
};

ButtonRadio.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

// ButtonRadio.defaultProps = { isChecked: true };
