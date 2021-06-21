import { HTMLAttributes } from 'react';
import { Container } from './Header.styles';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  hasExtra?: boolean;
}

const Header = ({ children, ...props }: HeaderProps) => {
  return <Container {...props}>{children}</Container>;
};

export default Header;
