import { PropTypes } from 'prop-types';
import React from 'react';

import { StyledButtonRound } from './style';

export const ButtonRound = (props) => {
  const { isChecked, value, name, onClick, children, ...rest } = props;

  return (
    <StyledButtonRound type="radio" name={name} value={value} onClick={onClick} {...rest}>
      {children}
    </StyledButtonRound>
  );
};

ButtonRound.propTypes = {
  isChecked: PropTypes.bool,
  value: PropTypes.node,
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
