import styled from 'styled-components';

export const Navbar = styled.nav`
  letter-spacing: 2px;
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

export const NavItem = styled.li`
  a {
    margin: 0 0.3em;
    color: inherit;
  }

  &:last-of-type {
    padding-right: 0;
  }
`;
