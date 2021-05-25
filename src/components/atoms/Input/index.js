import React from 'react';
import PropTypes from 'prop-types';

import { Container, Label, InputField, Icon, Message } from './style';

export const Input = (props) => {
  const { icon, hasMessage, message, ...rest } = props;

  return (
    <Container>
      <Label>
        {icon && <Icon>{icon}</Icon>}
        <InputField {...rest} />
      </Label>
      {hasMessage && <Message data-testid="message">{message}</Message>}
    </Container>
  );
};

Input.prototype = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
  hasMessage: PropTypes.bool,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'submit',
  hasMessage: false,
};
