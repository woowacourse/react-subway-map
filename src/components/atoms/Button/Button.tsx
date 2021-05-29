import { Container } from './Button.styles';

export type ButtonTheme = 'default' | 'edit' | 'menu';
export type ButtonType = 'submit' | 'button';
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonTheme?: ButtonTheme;
  disabled?: boolean;
  type?: ButtonType;
}

const Button = ({
  type = 'submit',
  onClick,
  buttonTheme = 'default',
  children,
  disabled = false,
  ...props
}: ButtonProps) => (
  <Container type={type} buttonTheme={buttonTheme} onClick={onClick} disabled={disabled} {...props}>
    {children}
  </Container>
);

export default Button;
