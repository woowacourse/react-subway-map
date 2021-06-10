import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Label, LabelText, InputField, Icon } from './style';

export const Input = forwardRef((props, ref) => {
  const { label, icon, ...rest } = props;

  return (
    <Container>
      <Label>
        {label && <LabelText>{label}</LabelText>}
        {icon && <Icon>{icon}</Icon>}
        <InputField ref={ref} icon={icon} {...rest} />
      </Label>
    </Container>
  );
});

Input.prototype = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'submit',
  hasMessage: false,
};
