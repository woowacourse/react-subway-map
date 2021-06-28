import { PropTypes } from 'prop-types';
import React from 'react';

import { RadioButtonInput, RadioButtonSpan, RadioButtonWrapper } from './style';

export const RadioButton = (props) => {
  const { isChecked, value, name, onChange } = props;

  return (
    <RadioButtonWrapper>
      <RadioButtonInput type="radio" name={name} value={value} checked={isChecked} onChange={onChange} />
      <RadioButtonSpan />
    </RadioButtonWrapper>
  );
};

RadioButton.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
