import { Container } from './Header.styles';

export interface HeaderProps {
  children: React.ReactNode;
  hasExtra?: boolean;
}

const Header = ({ hasExtra = false, children, ...props }: HeaderProps) => {
  return (
    <Container hasExtra={hasExtra} {...props}>
      {children}
    </Container>
  );
};

export default Header;
