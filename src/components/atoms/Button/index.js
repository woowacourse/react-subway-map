import PropTypes from 'prop-types';
import React from 'react';

export const Button = (props) => {
  const { children, ...rest } = props;

  return <button {...rest}>{children}</button>;
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
