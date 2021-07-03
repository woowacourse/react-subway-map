import { ButtonHTMLAttributes } from 'react';
import { ButtonTheme, StyledButton } from './Button.styles';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonTheme?: ButtonTheme;
  bgColor?: string;
}

const Button = ({ buttonTheme = 'default', children, bgColor, ...props }: ButtonProps) => (
  <StyledButton buttonTheme={buttonTheme} bgColor={bgColor} {...props}>
    {children}
  </StyledButton>
);

export default Button;
