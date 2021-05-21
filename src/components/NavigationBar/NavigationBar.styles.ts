import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PALETTE from '../../constants/palette';
import Container from '../@common/Container/Container.styles';

export const NavigationBarContainer = styled(Container)`
  height: 5.125rem;
  padding: 0 1rem;
  align-items: center;
  border-bottom: 1px solid ${PALETTE.GRAY_300};
  justify-content: space-between;
  color: ${PALETTE.FONT};
`;

export const Logo = styled(Container)`
  cursor: pointer;
  width: 5rem;
`;

export const LogoImg = styled.img`
  width: 5rem;
`;

export const StyledNavLink = styled(NavLink)`
  display: block;
  box-sizing: border-box;
  width: 6rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  border-radius: 0.375rem;
  margin: 0 0.25rem;
  font-size: 0.875rem;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) inset;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
