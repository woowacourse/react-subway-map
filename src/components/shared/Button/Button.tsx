import { Container } from './Button.styles';

export type ButtonTheme = 'default' | 'edit' | 'menu';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  buttonTheme: ButtonTheme;
  disabled?: boolean;
}

const Button = ({ onClick, buttonTheme = 'default', children, ...props }: ButtonProps) => (
  <Container buttonTheme={buttonTheme} onClick={onClick} {...props}>
    {children}
  </Container>
);

export default Button;
