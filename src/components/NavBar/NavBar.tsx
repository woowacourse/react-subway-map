import styled from 'styled-components';

const NavBar = styled.nav`
  & > * {
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid transparent;
    user-select: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  & > *:not(last-child) {
    margin-right: 0.4rem;
  }
`;

export default NavBar;
