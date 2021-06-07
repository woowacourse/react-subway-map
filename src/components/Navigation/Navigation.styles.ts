import styled from "styled-components";

const NavigationBlock = styled.nav`
  display: flex;
  justify-content: center;

  a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export { NavigationBlock };
