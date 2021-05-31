import React, { ButtonHTMLAttributes } from 'react';
import * as Styled from './Button.styles';
import { ButtonShape, ButtonVariant } from './Button.types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  fullWidth?: boolean;
  active?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  shape = 'default',
  fullWidth = false,
  active = false,
  ...props
}: Props) => (
  <Styled.Button variant={variant} shape={shape} fullWidth={fullWidth} active={active} {...props}>
    {children}
  </Styled.Button>
);

export default Button;
