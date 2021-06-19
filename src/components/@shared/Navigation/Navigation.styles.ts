import styled from 'styled-components';
import Button from '../../@common/Button/Button';

export const NavList = styled.ul`
  display: flex;

  li {
    margin-left: 0.25rem;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const NavButton = styled(Button)`
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 1rem;
`;
