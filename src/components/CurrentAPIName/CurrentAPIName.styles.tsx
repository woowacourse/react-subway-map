import styled from 'styled-components';

export const StyledCurrentAPIName = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
  padding: 0.875rem 1rem;
  background: white;
  border-radius: 0.625rem;

  &:hover {
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5) inset;
  }
`;
