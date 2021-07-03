import { HTMLAttributes } from 'react';
import { Container, HeaderStyleProps } from './Header.styles';

export interface HeaderProps extends HTMLAttributes<HTMLElement>, HeaderStyleProps {
  children: React.ReactNode;
}

const Header = ({ children, ...props }: HeaderProps) => {
  return <Container {...props}>{children}</Container>;
};

export default Header;
