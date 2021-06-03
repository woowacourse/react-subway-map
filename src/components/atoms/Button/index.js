import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './style';

export const Button = (props) => {
  const { children, ...rest } = props;

  return <StyledButton {...rest}>{children}</StyledButton>;
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
