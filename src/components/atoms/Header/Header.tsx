import { Container } from './Header.styles';

export interface HeaderProps {
  children: React.ReactNode;
  hasExtra?: boolean;
}

const Header = ({ hasExtra = false, children }: HeaderProps) => {
  return <Container hasExtra={hasExtra}>{children}</Container>;
};

export default Header;
