import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavList = styled.ul`
  display: flex;

  li {
    margin-left: 0.25rem;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const NavigationLink = styled(Link)`
  position: relative;
  background-color: transparent;
  padding: 0.75rem 1rem;
  font-weight: 600;

  &:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    z-index: -1;
  }
`;
