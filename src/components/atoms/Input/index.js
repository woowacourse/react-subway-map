import React from 'react';
import PropTypes from 'prop-types';

import { Label, InputField, Icon, Message } from './style';

export const Input = (props) => {
  const { icon, message, ...rest } = props;

  return (
    <>
      <Label>
        {icon && <Icon>{icon}</Icon>}
        <InputField {...rest} />
      </Label>
      <Message>{message}</Message>
    </>
  );
};

Input.prototype = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.string,
};

Input.defaultProps = {
  type: 'submit',
};
