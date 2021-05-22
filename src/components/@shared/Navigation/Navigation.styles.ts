import styled from 'styled-components';

export const NavList = styled.ul`
  display: flex;

  li {
    position: relative;
    background-color: transparent;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-left: 0.5rem;
    font-weight: 600;
    overflow: hidden;

    &:first-child {
      margin-left: 0;
    }

    &:hover::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.07);
    }
  }
`;
