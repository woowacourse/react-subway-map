import styled from 'styled-components';

export const StyledStationListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.375rem 0;

  &:hover {
    box-shadow: 2px 0px 2px -2px rgba(0, 0, 0, 0.5) inset;
  }
`;
